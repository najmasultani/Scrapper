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
import RegisterForm from "@/components/register/RegisterForm";

const RegisterGardener = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    toast({
      title: "Registration Submitted",
      description: "Thank you! Your gardener/farmer profile has been registered.",
    });
    setTimeout(() => navigate("/dashboard/gardener"), 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 flex flex-col items-center">
      <div className="max-w-xl w-full mt-12">
        <RegisterForm role="gardener" onSubmit={handleSubmit} />
        <Button type="button" variant="secondary" className="mt-4 w-full" onClick={() => navigate("/")}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default RegisterGardener;
