
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Get your token from Supabase Secrets
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN || ""; // fallback for Lovable secret injection

type Props = {
  value?: {
    lng: number;
    lat: number;
    address: string;
  };
  onChange: (location: { lng: number; lat: number; address: string }) => void;
};

const MapLocationPicker: React.FC<Props> = ({ value, onChange }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [coords, setCoords] = useState<{
    lng: number;
    lat: number;
    address: string;
  }>(
    value || {
      lng: -122.4194,
      lat: 37.7749,
      address: "",
    }
  );
  const [loading, setLoading] = useState(false);

  // Reverse geocode coordinates to address
  async function reverseGeocode(lng: number, lat: number) {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}`
      );
      const data = await res.json();
      const address = data?.features?.[0]?.place_name || "";
      setLoading(false);
      return address;
    } catch (e) {
      setLoading(false);
      return "";
    }
  }

  useEffect(() => {
    if (!mapContainer.current) return;

    if (!MAPBOX_TOKEN) {
      console.error("Missing Mapbox public token. Set VITE_MAPBOX_PUBLIC_TOKEN in your .env.");
      return;
    }
    mapboxgl.accessToken = MAPBOX_TOKEN;
    // Clean up old map instance
    if (mapRef.current) {
      mapRef.current.remove();
    }
    // Initialize Map
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [coords.lng, coords.lat],
      zoom: 13,
    });

    mapRef.current.on('load', () => {
      console.log("Map loaded");
    });

    // Add marker
    markerRef.current = new mapboxgl.Marker({ draggable: true })
      .setLngLat([coords.lng, coords.lat])
      .addTo(mapRef.current);

    async function updateLocation(lngLat: { lng: number; lat: number }) {
      const address = await reverseGeocode(lngLat.lng, lngLat.lat);
      setCoords({ ...lngLat, address });
      onChange({ ...lngLat, address });
    }

    markerRef.current.on("dragend", () => {
      if (!markerRef.current) return;
      const lngLat = markerRef.current.getLngLat();
      updateLocation(lngLat);
    });

    mapRef.current.on("click", (e) => {
      if (!markerRef.current) return;
      markerRef.current.setLngLat(e.lngLat);
      updateLocation(e.lngLat);
    });

    return () => {
      mapRef.current && mapRef.current.remove();
      mapRef.current = null;
    };
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If value changes from outside, update marker/address
  useEffect(() => {
    if (!value || !markerRef.current) return;
    markerRef.current.setLngLat([value.lng, value.lat]);
  }, [value?.lng, value?.lat]);

  return (
    <div>
      {!MAPBOX_TOKEN && (
        <div className="bg-red-100 text-red-800 font-semibold text-center p-3 my-2 rounded">
          Mapbox token is missing.<br />
          Please set <span className="font-mono">VITE_MAPBOX_PUBLIC_TOKEN</span> in your project environment.
        </div>
      )}
      <div
        ref={mapContainer}
        className="w-full h-56 min-h-56 rounded-lg border mb-2 bg-gray-100"
        style={{ minHeight: 224 }}
      />
      <div className="text-sm text-muted-foreground">
        {loading
          ? "Resolving address..."
          : coords.address
            ? `Selected: ${coords.address}`
            : "Click or drag the marker to set your location."}
      </div>
    </div>
  );
};

export default MapLocationPicker;
