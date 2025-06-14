import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { MessageCircle, Save, Image as ImageIcon } from "lucide-react";

type Listing = {
  type: string;
  image: string;
  compostImage: string;
  quantity: string;
  availableDays: string[];
  distance: string;
  owner: string;
  role: string;
  delivery: boolean;
  pickup: boolean;
};

const CompostListingCard: React.FC<Listing> = ({
  type,
  image,
  compostImage,
  quantity,
  availableDays,
  distance,
  owner,
  role,
  delivery,
  pickup,
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [compostImageError, setCompostImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleCompostImageError = () => {
    setCompostImageError(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition p-4 flex flex-col gap-3 border animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full border bg-gray-50 flex items-center justify-center overflow-hidden">
          {!imageError && image ? (
            <img 
              src={image} 
              alt={`${owner}'s profile`} 
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <ImageIcon className="w-6 h-6 text-gray-400" />
            </div>
          )}
        </div>
        <div>
          <div className="font-bold text-green-800">{type}</div>
          <div className="text-xs text-gray-500">{owner} &middot; {role}</div>
        </div>
      </div>

      {/* Compost Image */}
      <div className="w-full h-32 rounded-lg overflow-hidden bg-gray-50">
        {!compostImageError && compostImage ? (
          <img 
            src={compostImage} 
            alt={`${type} compost sample`} 
            className="w-full h-full object-cover"
            onError={handleCompostImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <ImageIcon className="w-8 h-8 text-gray-400" />
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Quantity: {quantity}</span>
        <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded">Days: {availableDays.join(", ")}</span>
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Distance: {distance}</span>
        {pickup && <span className="bg-lime-100 text-lime-800 px-2 py-1 rounded">Pickup</span>}
        {delivery && <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded">Delivery</span>}
      </div>
      {/* Button row: equally spaced, inside card */}
      <div className="flex w-full items-center justify-between gap-2 mt-auto pt-2">
        <Button 
          variant="secondary"
          className="flex-1"
          onClick={() => setConfirmOpen(true)}
        >
          Request Pickup
        </Button>
        <Button 
          variant="ghost"
          className="flex-1"
          onClick={() => setChatOpen(true)}
        >
          <MessageCircle />
          Chat
        </Button>
        <Button 
          variant="ghost"
          className="flex-1"
        >
          <Save />
          Save
        </Button>
      </div>

      {/* Request Confirmation Dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Pickup</DialogTitle>
          </DialogHeader>
          <div>
            Request a pickup for <span className="font-semibold">{type}</span> from <span className="font-semibold">{owner}</span>?
          </div>
          <DialogFooter className="flex flex-col gap-2">
            <Button onClick={() => setChatOpen(true)} variant="outline">
              Chat Before Confirming
            </Button>
            <Button onClick={() => setConfirmOpen(false)}>
              Confirm Request
            </Button>
            <Button variant="ghost" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Chat Modal (simple placeholder) */}
      <Dialog open={chatOpen} onOpenChange={setChatOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chat with {owner}</DialogTitle>
          </DialogHeader>
          <div className="p-3 text-gray-500 italic">Messaging not implemented (placeholder)</div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setChatOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompostListingCard;

