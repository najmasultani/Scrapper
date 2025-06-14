
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  // If already logged in, redirect to home
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigate("/");
      }
    });
  }, [navigate]);

  // Handle provider sign-in (GitHub)
  const handleSignInWithGithub = async () => {
    setLoading(true);
    setErrorMsg(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: window.location.origin + "/auth", // handle redirect on our page
      },
    });
    if (error) setErrorMsg(error.message);
    // User will be redirected by Supabase if successful
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-yellow-50">
      <div className="p-8 rounded-xl bg-white shadow-lg flex flex-col gap-8 w-full max-w-lg">
        <h1 className="font-bold text-2xl text-green-900 text-center">
          Sign In / Create Account
        </h1>
        <Button
          onClick={handleSignInWithGithub}
          className="bg-black hover:bg-neutral-900 text-white w-full flex gap-2 items-center justify-center py-3 text-base"
          disabled={loading}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path
              d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6V21h-3.3c-.7-1.4-1.3-2.8-1.3-2.8-.5-1.1-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1 1.7-1.3 1.9-2.1.1-.3.2-.6.4-.8-2.7-.3-5.5-1.3-5.5-6a4.7 4.7 0 0 1 1.1-3.2c-.1-.3-.5-1.4.1-3a11.7 11.7 0 0 1 3.1 1c.9-.3 1.9-.5 2.9-.5s2 .2 2.9.5a11.7 11.7 0 0 1 3.1-1c.5 1.6.2 2.7.1 3 .7.9 1.1 2 1.1 3.2 0 4.7-2.8 5.7-5.5 6 .2.2.4.5.4.9v2.6c0 .3.2.8.8.6A12 12 0 0 0 12 .3"
            />
          </svg>
          Continue with GitHub
        </Button>
        {errorMsg && (
          <div className="text-red-500 bg-red-100 px-3 py-1 rounded text-center">
            {errorMsg}
          </div>
        )}
        <div className="text-xs text-center text-gray-500">
          By signing in, you agree to our terms and privacy policy.
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
