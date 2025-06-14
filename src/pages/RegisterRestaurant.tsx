
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { format } from "date-fns";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const compostTypes = [
  "Vegetable Scraps",
  "Fruit Scraps",
  "Coffee Grounds",
  "Eggshells",
  "Other",
];

const RegisterRestaurant = () => {
  const navigate = useNavigate();
  const [restaurantName, setRestaurantName] = useState("");
  const [address, setAddress] = useState("");
  const [contactName, setContactName] = useState("");
  const [compostType, setCompostType] = useState("");
  const [availabilityType, setAvailabilityType] = useState("pickup"); // pickup or delivery
  const [selectedDates, setSelectedDates] = useState<Date[] | undefined>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just toast; in production, will save to Supabase.
    toast({
      title: "Registration Submitted",
      description: "Thank you! Your restaurant has been registered.",
    });
    setTimeout(() => navigate("/dashboard"), 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 flex flex-col items-center">
      <div className="max-w-xl w-full mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Register Your Restaurant</CardTitle>
            <CardDescription>
              Enter your restaurant information to start matching with local gardeners.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div>
                <label className="font-semibold text-green-900 block mb-1" htmlFor="restaurant_name">
                  Restaurant Name
                </label>
                <Input
                  id="restaurant_name"
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                  required
                  placeholder="e.g. Cafe Verde"
                />
              </div>
              <div>
                <label className="font-semibold text-green-900 block mb-1" htmlFor="address">
                  Address
                </label>
                <Textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  placeholder="123 Main St, City, ZIP"
                />
              </div>
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
                  Compost Type
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
                <label className="font-semibold text-green-900 block mb-1">
                  Delivery or Pickup Availability
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
              <Button type="submit" className="bg-green-600 mt-4 text-lg py-3 w-full rounded-lg">
                Register Restaurant
              </Button>
              <Button type="button" variant="secondary" className="mt-2 w-full" onClick={() => navigate("/")}>
                Cancel
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterRestaurant;
