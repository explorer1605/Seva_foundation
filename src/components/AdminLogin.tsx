import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
      });

      if (error) {
        setErrorMessage(error.message);
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF8F3] flex items-center justify-center p-4">
      <div className="w-full max-w-[400px] bg-white border-[1.5px] border-[#3D2D20] rounded-[16px] p-8 md:p-10 shadow-[0_8px_32px_rgba(61,45,32,0.05)] animate-fade-in">
        <h2 className="font-serif font-bold text-[28px] text-[#3D2D20] text-center mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 font-sans">
          <div>
            <label className="block text-[14px] font-medium text-[#5C4A3E] mb-1.5" htmlFor="login-email">
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gouseva.org"
              className="w-full border border-[#EBE4D8] rounded-lg px-4 py-3 text-[15px] text-[#3D2D20] placeholder-[#C4BAB0] focus:ring-2 focus:ring-[#3D2D20]/10 focus:border-[#3D2D20] focus:outline-none bg-[#FBF8F3]/30"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-[14px] font-medium text-[#5C4A3E] mb-1.5" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-[#EBE4D8] rounded-lg px-4 py-3 text-[15px] text-[#3D2D20] placeholder-[#C4BAB0] focus:ring-2 focus:ring-[#3D2D20]/10 focus:border-[#3D2D20] focus:outline-none bg-[#FBF8F3]/30"
              disabled={isLoading}
            />
          </div>

          {errorMessage && (
            <p className="text-[14px] text-[#A94A42] font-medium leading-normal" id="login-error">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#3D2D20] hover:bg-[#3D2D20]/90 text-white font-sans font-semibold py-3.5 px-6 rounded-lg text-[15px] transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_12px_rgba(61,45,32,0.1)] focus:outline-none focus:ring-2 focus:ring-[#3D2D20] focus:ring-offset-2"
          >
            {isLoading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
