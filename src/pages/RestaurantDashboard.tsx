
import React, { useState } from "react";
import MyCompostMatchDashboard from "./MyCompostMatchDashboard";
import { Button } from "@/components/ui/button";
import CompostUploadForm from "@/components/CompostUploadForm";
import { Dialog } from "@radix-ui/react-dialog";

const RestaurantDashboard = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 via-white to-amber-50 p-6 flex flex-col gap-6 animate-fade-in">
      <div className="mb-2">
        <Button
          className="mb-4 w-full sm:w-auto"
          aria-label="Upload Compost Listing"
          onClick={() => setOpen(true)}
        >
          + Upload Compost Listing
        </Button>
        {open && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 text-green-800 hover:bg-green-100 rounded-full p-1"
                aria-label="Close"
              >
                ×
              </button>
              <CompostUploadForm
                onSuccess={() => {
                  setOpen(false);
                  window.location.reload();
                }}
                onCancel={() => setOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
      <MyCompostMatchDashboard role="restaurant" demo />
    </div>
  );
};

export default RestaurantDashboard;
