
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

// The type of the user/session you expect to read in AuthContext:
type Session = {
  user: {
    id: string;
    email: string;
    // ...add other fields you need
  } | null;
};

export const AuthContext = createContext<Session | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Listen for Supabase auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session ? { user: session.user } : null);
      }
    );
    // Get current session on mount
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ? { user: data.session.user } : null);
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
