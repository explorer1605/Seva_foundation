import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { AdminPanel } from "./AdminPanel";
import { AdminLogin } from "./AdminLogin";

export function AdminRoute() {
  const [session, setSession] = useState<any>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (checking) return <div className="p-8 text-center font-sans text-body-brown animate-pulse">Checking session…</div>;
  if (!session)  return <AdminLogin />;
  return <AdminPanel session={session} />;
}
