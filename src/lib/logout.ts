
import { supabase } from "@/integrations/supabase/client";

export const logout = () => supabase.auth.signOut();
