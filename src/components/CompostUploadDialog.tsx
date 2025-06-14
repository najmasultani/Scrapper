
import React, { useState, useContext } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AuthContext } from "@/contexts/AuthProvider";

interface CompostUploadDialogProps {
  forceHide?: boolean;
}

// This dialog will not render if forceHide=true
const CompostUploadDialog: React.FC<CompostUploadDialogProps> = ({ forceHide }) => {
  const [open, setOpen] = useState(false);
  const [compostType, setCompostType] = useState("");
  const [loading, setLoading] = useState(false);
  const session = useContext(AuthContext); // read from context

  if (forceHide) return null;

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!compostType) {
      toast({ title: "Please enter a compost type!" });
      return;
    }
    setLoading(true);

    // Get user_id from session context
    const userId = session && session.user ? session.user.id : null;

    if (!userId) {
      toast({ title: "Not signed in", description: "Please log in to upload." });
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("restaurant_compost_listings")
      .insert({
        compost_type: compostType,
        location: "Unknown",
        pickup_availability: "pickup",
        user_id: userId,
      });

    setLoading(false);
    if (error) {
      toast({ title: "Error uploading", description: error.message });
    } else {
      toast({ title: "Compost listing uploaded" });
      setCompostType("");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4 w-full sm:w-auto">+ Upload Compost Listing</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Compost Listing</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleUpload} className="flex flex-col gap-4 mt-2">
          <Input
            placeholder="e.g. Vegetable Scraps, Fruit Waste"
            value={compostType}
            onChange={e => setCompostType(e.target.value)}
            disabled={loading}
            required
          />
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={loading}>Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CompostUploadDialog;

