
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
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}`
    );
    const data = await res.json();
    const address = data?.features?.[0]?.place_name || "";
    setLoading(false);
    return address;
  }

  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN) return;
    // Init Mapbox map
    mapboxgl.accessToken = MAPBOX_TOKEN;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [coords.lng, coords.lat],
      zoom: 13,
    });

    // Add marker
    markerRef.current = new mapboxgl.Marker({ draggable: true })
      .setLngLat([coords.lng, coords.lat])
      .addTo(map);

    async function updateLocation(lngLat: { lng: number; lat: number }) {
      const address = await reverseGeocode(lngLat.lng, lngLat.lat);
      setCoords({ ...lngLat, address });
      onChange({ ...lngLat, address });
    }

    markerRef.current.on("dragend", () => {
      const lngLat = markerRef.current!.getLngLat();
      updateLocation(lngLat);
    });

    map.on("click", (e) => {
      // Move marker and update
      markerRef.current!.setLngLat(e.lngLat);
      updateLocation(e.lngLat);
    });

    return () => {
      map.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If value changes from outside, update marker/address
  useEffect(() => {
    if (value && markerRef.current) {
      markerRef.current.setLngLat([value.lng, value.lat]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value?.lng, value?.lat]);

  return (
    <div>
      <div ref={mapContainer} className="w-full h-56 rounded-lg border mb-2" />
      <div className="text-sm text-muted-foreground">
        {loading ? "Resolving address..." : coords.address ? `Selected: ${coords.address}` : "Click or drag the marker to set your location."}
      </div>
    </div>
  );
};

export default MapLocationPicker;
