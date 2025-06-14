import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { format } from "date-fns";
import { toast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

const compostTypes = [
  "Vegetable Scraps",
  "Fruit Scraps",
  "Coffee Grounds",
  "Eggshells",
  "Other",
];

const RegisterGardener = () => {
  const navigate = useNavigate();
  const [gardenName, setGardenName] = useState("");
  const [contactName, setContactName] = useState("");
  const [compostType, setCompostType] = useState("");
  const [amount, setAmount] = useState("");
  const [availabilityType, setAvailabilityType] = useState("pickup");
  const [selectedDates, setSelectedDates] = useState<Date[] | undefined>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Save to Supabase (optional enhancement, keep old toast + nav for now)
    toast({
      title: "Registration Submitted",
      description: "Thank you! Your gardener/farmer profile has been registered.",
    });
    setTimeout(() => navigate("/dashboard"), 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 flex flex-col items-center">
      <div className="max-w-xl w-full mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Register Your Garden or Farm</CardTitle>
            <CardDescription>
              Enter your details to find compost partners in your area.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
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
                  Compost Type Wanted
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
                  Amount needed (kg)
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
              <Button type="submit" className="bg-amber-500 mt-4 text-lg py-3 w-full rounded-lg">
                Register Garden/Farm
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

export default RegisterGardener;
