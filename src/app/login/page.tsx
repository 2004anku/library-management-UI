"use client";
// React
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, BookOpen } from "lucide-react";

// Features
import { useLogin } from "@/features/auth/hooks/useLogin";
// Utils
import { handleApiError } from "@/utils/errorHandler";

export default function LoginPage() {
  const router = useRouter();
  const loginMutation = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    loginMutation.mutate(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          router.push("/");
        },

        onError: (err) => {
          setError(handleApiError(err));
        },
      },
    );
  };

  return (
    <div
      className="
        min-h-screen
        bg-[var(--bg-primary)]
        flex items-center justify-center
        p-4
        relative
        overflow-hidden
      "
    >
      {/* Background Glow */}
      <div
        className="
          absolute top-1/4 left-1/4
          w-96 h-96
          bg-[var(--primary)]/10
          rounded-full
          blur-3xl
          pointer-events-none
        "
      />

      <div
        className="
          absolute bottom-1/4 right-1/4
          w-96 h-96
          bg-[var(--primary)]/5
          rounded-full
          blur-3xl
          pointer-events-none
        "
      />

      {/* Card */}
      <div
        className="
          w-full max-w-md
          bg-[var(--bg-sidebar)]
          rounded-2xl
          border border-[var(--border)]
          p-8
          shadow-2xl
          relative z-10
        "
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="
              inline-flex
              items-center justify-center
              p-3
              rounded-xl
              mb-4
              bg-[var(--primary)]/10
              text-[var(--primary)]
            "
          >
            <BookOpen size={28} />
          </div>

          <h1
            className="
              text-2xl
              font-bold
              heading-font
              text-[var(--text-primary)]
              tracking-tight
            "
          >
            Book
            <span className="text-[var(--primary)]">Hub</span>
          </h1>

          <p
            className="
              text-sm
              text-[var(--text-secondary)]
              mt-1
            "
          >
            Welcome back! Please enter your details.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <label
              className="
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-[var(--text-secondary)]
              "
            >
              Email Address
            </label>

            <div className="relative">
              <span
                className="
                  absolute inset-y-0 left-0
                  flex items-center
                  pl-3
                  text-[var(--text-secondary)]
                "
              >
                <Mail size={18} />
              </span>

              <input
                type="email"
                required
                placeholder="admin@bookhub.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full
                  bg-[var(--bg-card)]
                  border border-[var(--border)]
                  text-[var(--text-primary)]
                  placeholder-[var(--text-secondary)]
                  pl-10 pr-4 py-3
                  rounded-xl
                  outline-none
                  text-sm
                  focus:border-[var(--primary)]
                  focus:ring-1
                  focus:ring-[var(--primary)]
                  transition-all
                "
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div
              className="
                flex
                justify-between
                items-center
              "
            >
              <label
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-[var(--text-secondary)]
                "
              >
                Password
              </label>

              <button
                type="button"
                className="
                  text-xs
                  text-[var(--primary)]
                  hover:underline
                "
              >
                Forgot password?
              </button>
            </div>

            <div className="relative">
              <span
                className="
                  absolute inset-y-0 left-0
                  flex items-center
                  pl-3
                  text-[var(--text-secondary)]
                "
              >
                <Lock size={18} />
              </span>

              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                  w-full
                  bg-[var(--bg-card)]
                  border border-[var(--border)]
                  text-[var(--text-primary)]
                  placeholder-[var(--text-secondary)]
                  pl-10 pr-10 py-3
                  rounded-xl
                  outline-none
                  text-sm
                  focus:border-[var(--primary)]
                  focus:ring-1
                  focus:ring-[var(--primary)]
                  transition-all
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute inset-y-0 right-0
                  flex items-center
                  pr-3
                  text-[var(--text-secondary)]
                  hover:text-[var(--text-primary)]
                  transition-colors
                "
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="
                h-4 w-4
                accent-[var(--primary)]
              "
            />

            <label
              htmlFor="remember-me"
              className="
                ml-2
                text-xs
                select-none
                text-[var(--text-secondary)]
              "
            >
              Remember me for 30 days
            </label>
          </div>

          {/* Error */}
          {error && (
            <p
              className="
                text-sm
                text-[var(--danger)]
              "
            >
              {error}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="
              w-full
              mt-2
              bg-[var(--primary)]
              hover:bg-[var(--primary-hover)]
              disabled:opacity-50
              text-[var(--text-primary)]
              font-medium
              py-3
              rounded-xl
              transition-all
              active:scale-[0.98]
            "
          >
            {loginMutation.isPending ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Footer */}
        <p
          className="
            text-center
            text-xs
            text-[var(--text-secondary)]
            mt-6
          "
        >
          Don't have an account?{" "}
          <button
            type="button"
            className="
              text-[var(--primary)]
              font-medium
              hover:underline
            "
          >
            Contact Super Admin
          </button>
        </p>
      </div>
    </div>
  );
}
