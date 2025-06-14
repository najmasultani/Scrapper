import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import RegisterForm from "@/components/register/RegisterForm";

const RegisterRestaurant = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    toast({
      title: "Registration Submitted",
      description: "Thank you! Your restaurant profile has been registered.",
    });
    setTimeout(() => navigate("/dashboard/restaurant"), 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 flex flex-col items-center">
      <div className="max-w-xl w-full mt-12">
        <RegisterForm role="restaurant" onSubmit={handleSubmit} />
        <Button type="button" variant="secondary" className="mt-4 w-full" onClick={() => navigate("/")}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default RegisterRestaurant;
