
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface CompostUploadFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const CompostUploadForm: React.FC<CompostUploadFormProps> = ({ onSuccess, onCancel }) => {
  const [compostType, setCompostType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Get current user (must be logged in)
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData.session?.user;

    if (!user) {
      setError("You must be signed in to upload a listing.");
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase
      .from("restaurant_compost_listings")
      .insert({
        compost_type: compostType || "Unknown",
        restaurant_name: null,
        location: "TBD",
        pickup_availability: "pickup",
        user_id: user.id,
      });

    if (insertError) {
      setError(insertError.message || "Failed to create listing");
    } else {
      setCompostType("");
      onSuccess();
    }
    setLoading(false);
  };

  return (
    <form className="p-4 space-y-4 bg-white rounded-lg max-w-sm mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold text-green-800">Upload Compost Listing</h2>
      <div>
        <label className="block text-sm font-semibold mb-1" htmlFor="compostType">
          Compost Type <span className="text-red-600">*</span>
        </label>
        <input
          id="compostType"
          className="block w-full border rounded px-3 py-2"
          type="text"
          required
          value={compostType}
          onChange={(e) => setCompostType(e.target.value)}
          placeholder="e.g. Vegetable scraps"
        />
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" className="bg-green-600 text-white" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </form>
  );
};

export default CompostUploadForm;
