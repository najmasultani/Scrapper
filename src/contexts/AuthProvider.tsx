
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

// Relaxed session context type: just mirror what's provided by supabase-js
type Session = {
  user: User | null;
};

export const AuthContext = createContext<Session | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Listen for Supabase auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session ? { user: session.user } : { user: null });
      }
    );
    // Get current session on mount
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ? { user: data.session.user } : { user: null });
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={session}>
      {children}
    </AuthContext.Provider>
  );
};
