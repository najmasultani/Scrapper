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
import ImageUpload from "@/components/ImageUpload";
import { CalendarIcon, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { DateRange } from "react-day-picker";

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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [amount, setAmount] = useState(""); // <-- NEW
  const [availabilityType, setAvailabilityType] = useState("pickup"); // pickup or delivery
  // Date Range Picker states
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined });
  // Time Range
  const [timeRange, setTimeRange] = useState<{ start: string; end: string }>({ start: "09:00", end: "17:00" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // image upload handlers
  function handleImageChange(file: File | null, url: string | null) {
    setImageFile(file);
    setImagePreview(url);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) {
      toast({
        title: "Address required",
        description: "Please enter your restaurant's address.",
        variant: "destructive",
      });
      return;
    }
    if (!dateRange.from || !dateRange.to) {
      toast({
        title: "Please select an available date range.",
        variant: "destructive",
      });
      return;
    }
    if (!imageFile) {
      toast({
        title: "Image required",
        description: "Please upload a representative image for your restaurant.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // 1. Upload image to Supabase Storage
    const fileExt = imageFile.name.split(".").pop();
    const filePath = `${crypto.randomUUID()}.${fileExt}`;
    let imageUrl = "";
    const { data: uploadData, error: uploadErr } = await supabase.storage
      .from("restaurant-images")
      .upload(filePath, imageFile, { cacheControl: "3600", upsert: false });

    if (uploadErr) {
      setIsSubmitting(false);
      toast({
        title: "Image Upload Failed",
        description: uploadErr.message,
        variant: "destructive",
      });
      return;
    } else if (uploadData) {
      // Get the public URL
      const { data } = supabase.storage
        .from("restaurant-images")
        .getPublicUrl(filePath);
      imageUrl = data.publicUrl;
    }

    // 2. Get the logged-in user's ID
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (!user || userError) {
      setIsSubmitting(false);
      toast({
        title: "Not signed in",
        description: "Please log in to register your restaurant.",
        variant: "destructive",
      });
      return;
    }

    // 3. Prepare pickup_availability as a string (date & time nicely formatted)
    const pickupAvailability = dateRange.from && dateRange.to
      ? `${dateRange.from.toISOString()},${dateRange.to.toISOString()},${timeRange.start},${timeRange.end}`
      : "";

    // 4. Insert restaurant listing into DB
    const { error: dbError } = await supabase.from("restaurant_compost_listings").insert([
      {
        restaurant_name: restaurantName,
        location: address,
        contact_name: contactName,
        compost_type: compostType,
        amount: amount ? Number(amount) : null,
        pickup_availability: pickupAvailability,
        user_id: user.id,
        image_url: imageUrl,
        created_at: new Date().toISOString(),
      },
    ]);

    if (dbError) {
      setIsSubmitting(false);
      toast({
        title: "Failed to register restaurant",
        description: dbError.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Registration Submitted",
      description: "Thank you! Your restaurant has been registered.",
    });
    setTimeout(() => navigate("/dashboard"), 1200);
  };

  // Helper for date display
  function rangeLabel() {
    if (!dateRange.from && !dateRange.to) return "Pick a date range";
    if (dateRange.from && !dateRange.to) return `From ${format(dateRange.from, "PPP")}`;
    if (dateRange.from && dateRange.to)
      return `${format(dateRange.from, "PPP")} - ${format(dateRange.to, "PPP")}`;
    return "";
  }

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
              {/* ADDRESS TEXT INPUT */}
              <div>
                <label className="font-semibold text-green-900 block mb-1" htmlFor="address">
                  Restaurant Address
                </label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  placeholder="Enter your address"
                />
              </div>
              {/* IMAGE UPLOAD */}
              <div>
                <label className="font-semibold text-green-900 block mb-1">
                  Restaurant Photo
                </label>
                <ImageUpload onFileChange={handleImageChange} />
                <div className="text-sm text-muted-foreground">
                  JPG, PNG or GIF supported. Max 5MB.
                </div>
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
                <label className="font-semibold text-green-900 block mb-1" htmlFor="amount">
                  Amount available (kg)
                </label>
                <Input
                  id="amount"
                  type="number"
                  min={0}
                  step="0.1"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  required
                  placeholder="e.g. 5"
                />
              </div>
              {/* DATE & TIME RANGE AVAILABILITY */}
              <div>
                <label className="font-semibold text-green-900 block mb-1">
                  Delivery or Pickup Availability
                </label>
                {/* Availability type */}
                <RadioGroup value={availabilityType} onValueChange={setAvailabilityType} className="flex gap-6 mt-1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <label htmlFor="pickup" className="text-green-900">Pickup</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <label htmlFor="delivery" className="text-green-900">Delivery</label>
                  </div>
                </RadioGroup>
                {/* Date range picker */}
                <div className="mt-4">
                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                      className="bg-white p-3 border rounded-lg pointer-events-auto"
                    />
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-green-900 font-medium flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Start Time
                        <input
                          type="time"
                          value={timeRange.start}
                          onChange={e =>
                            setTimeRange(r => ({ ...r, start: e.target.value }))
                          }
                          required
                          className="ml-1 border rounded px-2 py-1"
                        />
                      </label>
                      <label className="text-sm text-green-900 font-medium flex items-center gap-2">
                        <Clock className="w-4 h-4" /> End Time
                        <input
                          type="time"
                          value={timeRange.end}
                          onChange={e =>
                            setTimeRange(r => ({ ...r, end: e.target.value }))
                          }
                          required
                          className="ml-1 border rounded px-2 py-1"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    {dateRange.from && dateRange.to
                      ? `Available: ${format(dateRange.from, "PPP")} to ${format(dateRange.to, "PPP")}, from ${timeRange.start} to ${timeRange.end} each day.`
                      : "Select an available date range and time."}
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                className="bg-green-600 mt-4 text-lg py-3 w-full rounded-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering…" : "Register Restaurant"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="mt-2 w-full"
                onClick={() => navigate("/")}
                disabled={isSubmitting}
              >
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
