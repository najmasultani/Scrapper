import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";

type RegisterFormValues = {
  gardenName?: string;
  contactName: string;
  compostType: string;
  amount: string;
  availabilityType?: string;
  selectedDates?: Date[];
  restaurantName?: string;
  pickupAvailability?: string;
  location?: string;
  licenceFile?: File | null;
};

interface RegisterFormProps {
  role: "restaurant" | "gardener";
  onSubmit: (values: RegisterFormValues) => void;
}

const compostTypes = [
  "Vegetable Scraps",
  "Fruit Scraps",
  "Coffee Grounds",
  "Eggshells",
  "Other",
];

const RegisterForm: React.FC<RegisterFormProps> = ({ role, onSubmit }) => {
  // Shared fields
  const [contactName, setContactName] = useState("");
  const [compostType, setCompostType] = useState("");
  const [amount, setAmount] = useState("");
  // Gardener only
  const [gardenName, setGardenName] = useState("");
  const [availabilityType, setAvailabilityType] = useState("pickup");
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  // Restaurant only
  const [restaurantName, setRestaurantName] = useState("");
  const [pickupAvailability, setPickupAvailability] = useState("");
  const [location, setLocation] = useState("");
  const [licenceFile, setLicenceFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Gather values based on role
    if (role === "gardener") {
      onSubmit({
        contactName,
        compostType,
        amount,
        gardenName,
        availabilityType,
        selectedDates,
      });
    } else {
      onSubmit({
        contactName,
        compostType,
        amount,
        restaurantName,
        pickupAvailability,
        location,
        licenceFile: licenceFile || null, // Always allow null/undefined
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {role === "gardener"
            ? "Register Your Garden or Farm"
            : "Register Your Restaurant or Café"}
        </CardTitle>
        <CardDescription>
          {role === "gardener"
            ? "Enter your details to find compost partners in your area."
            : "Enter your restaurant/café details to share compostables with local gardeners & farmers."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {role === "gardener" ? (
            <div>
              <label className="font-semibold text-green-900 block mb-1" htmlFor="garden_name">
                Name of Garden or Farm
              </label>
              <Input
                id="garden_name"
                value={gardenName}
                onChange={(e) => setGardenName(e.target.value)}
                required
                placeholder="e.g. Sunny Patch Gardens"
              />
            </div>
          ) : (
            <div>
              <label className="font-semibold text-green-900 block mb-1" htmlFor="restaurant_name">
                Name of Restaurant or Café
              </label>
              <Input
                id="restaurant_name"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                required
                placeholder="e.g. Green Eats Café"
              />
            </div>
          )}

          <div>
            <label className="font-semibold text-green-900 block mb-1" htmlFor="contact_name">
              Contact Name
            </label>
            <Input
              id="contact_name"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              required
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="font-semibold text-green-900 block mb-1" htmlFor="compost_type">
              Compost Type {role === "restaurant" ? "Offered" : "Wanted"}
            </label>
            <select
              id="compost_type"
              value={compostType}
              onChange={(e) => setCompostType(e.target.value)}
              required
              className="w-full px-2 py-2 bg-white border rounded focus-visible:ring-2 focus-visible:ring-green-200 text-green-800"
            >
              <option value="">Select compost type</option>
              {compostTypes.map((type) => (
                <option value={type} key={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-semibold text-green-900 block mb-1" htmlFor="amount">
              Amount {role === "restaurant" ? "available" : "needed"} (kg)
            </label>
            <Input
              id="amount"
              type="number"
              min={0}
              step="0.1"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              required
              placeholder="e.g. 3"
            />
          </div>

          {role === "gardener" && (
            <div>
              <label className="font-semibold text-green-900 block mb-1">
                Pickup or Delivery Availability
              </label>
              <RadioGroup defaultValue={availabilityType} onValueChange={setAvailabilityType} className="flex gap-6 mt-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <label htmlFor="pickup" className="text-green-900">Pickup</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="delivery" id="delivery" />
                  <label htmlFor="delivery" className="text-green-900">Delivery</label>
                </div>
              </RadioGroup>
              <div className="mt-4">
                <Calendar
                  mode="multiple"
                  selected={selectedDates}
                  onSelect={setSelectedDates}
                  className="bg-white p-3 border rounded-lg pointer-events-auto"
                />
                <div className="text-sm text-muted-foreground mt-2">
                  {selectedDates && selectedDates.length > 0
                    ? `Available: ${selectedDates.map(d => format(d, "PPP")).join(", ")}`
                    : "Select your available dates above."}
                </div>
              </div>
            </div>
          )}

          {role === "restaurant" && (
            <>
              <div>
                <label className="font-semibold text-green-900 block mb-1" htmlFor="pickup_availability">
                  Pickup Availability
                </label>
                <Input
                  id="pickup_availability"
                  value={pickupAvailability}
                  onChange={e => setPickupAvailability(e.target.value)}
                  required
                  placeholder="e.g. M-F 7am-11am"
                />
              </div>
              <div>
                <label className="font-semibold text-green-900 block mb-1" htmlFor="location">
                  Address/Location
                </label>
                <Input
                  id="location"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  required
                  placeholder="555 Organic Ave, Townsville"
                />
              </div>
              <div>
                <label className="font-semibold text-green-900 block mb-1" htmlFor="licence_file">
                  Business Licence (optional)
                </label>
                <Input
                  id="licence_file"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={e => {
                    if (e.target.files && e.target.files.length > 0) setLicenceFile(e.target.files[0]);
                  }}
                  aria-label="Upload business licence (optional)"
                />
                <div className="text-xs text-muted-foreground mt-1">
                  Attach your business licence (optional; some jurisdictions may require this).
                </div>
              </div>
            </>
          )}

          <Button
            type="submit"
            className={role === "restaurant"
              ? "bg-green-600 mt-4 text-lg py-3 w-full rounded-lg"
              : "bg-amber-500 mt-4 text-lg py-3 w-full rounded-lg"}>
            {role === "gardener" ? "Register Garden/Farm" : "Register Restaurant/Cafe"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
