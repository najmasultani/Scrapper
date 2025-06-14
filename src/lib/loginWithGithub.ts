
import { supabase } from "@/integrations/supabase/client";

export const loginWithGithub = () =>
  supabase.auth.signInWithOAuth({
    provider: "github",
    options: { redirectTo: window.location.origin },
  });
