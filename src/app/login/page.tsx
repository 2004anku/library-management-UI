"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/domain/features/auth/services/auth.service";
import { handleApiError } from "@/utils/errorHandler";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      await loginUser({
        email,
        password,
      });

      router.push("/");
    } catch (err) {
      console.error("Login Error:", err);

      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1220]">
      <div className="w-full max-w-md bg-[#111827] p-8 rounded-2xl border border-[#1e293b] shadow-xl">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Admin Login
        </h1>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 rounded-xl bg-[#0f172a] border border-[#1e293b] text-white outline-none focus:border-indigo-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-3 rounded-xl bg-[#0f172a] border border-[#1e293b] text-white outline-none focus:border-indigo-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* ERROR */}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white py-3 rounded-xl font-semibold transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
