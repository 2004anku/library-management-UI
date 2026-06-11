"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { loginUser } from "@/domain/features/auth/services/auth.service";

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

      const res = await loginUser({
        email,
        password,
      });
      console.log("LOGIN RESPONSE:", res);

      router.push("/");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed, try again");
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
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-3 rounded-xl bg-[#0f172a] border border-[#1e293b] text-white outline-none focus:border-indigo-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* ERROR */}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-semibold transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
