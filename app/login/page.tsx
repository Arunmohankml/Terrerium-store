"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { KeyRound, ArrowRight, ShieldCheck, Lock, Mail, Sparkles, Check, AlertCircle } from "lucide-react";
import { auth, googleProvider, isFirebaseConfigured, PRIMARY_ADMIN_EMAIL } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { AnimatedButton } from "@/components/AnimatedButton";

const ADMIN_EMAIL = PRIMARY_ADMIN_EMAIL;

function LoginFormContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next");

  // Check if already signed in
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        if (user.email.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase()) {
          router.push("/admin");
        } else if (nextUrl) {
          router.push(nextUrl);
        }
      }
    });

    // Check localStorage admin auth
    try {
      const localAdmin = localStorage.getItem("aquaterra_admin_auth");
      if (localAdmin === ADMIN_EMAIL) {
        if (nextUrl) router.push(nextUrl);
      }
    } catch {}

    return () => unsub();
  }, [router, nextUrl]);

  // Google Sign-In with Firebase
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isFirebaseConfigured) {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        const userEmail = (user.email || "").toLowerCase().trim();

        if (userEmail === ADMIN_EMAIL.toLowerCase()) {
          localStorage.setItem("aquaterra_admin_auth", ADMIN_EMAIL);
          setSuccess(`Welcome Admin (${user.displayName || "Arun Mohan"})! Directing to Admin Hub...`);
          setTimeout(() => router.push("/admin"), 1000);
        } else {
          localStorage.setItem("aquaterra_demo_user", JSON.stringify({ email: user.email, name: user.displayName }));
          setSuccess(`Signed in as ${user.displayName || user.email}!`);
          setTimeout(() => router.push(nextUrl || "/account"), 1000);
        }
      } else {
        // Fallback demo if Firebase client keys not placed in env yet
        localStorage.setItem("aquaterra_demo_user", JSON.stringify({ email: "collector@aquaterra.in", name: "Google Collector" }));
        setSuccess("Signed in with Google Account!");
        setTimeout(() => router.push(nextUrl || "/account"), 1000);
      }
    } catch (err: any) {
      if (err.code === "auth/popup-closed-by-user") {
        setError("Google sign-in popup was cancelled.");
      } else if (err.code === "auth/popup-blocked") {
        setError("Popup was blocked by your browser. Please allow popups for localhost.");
      } else {
        // Provide friendly message and fallback option
        setError(err.message || "Unable to complete Google sign in. Use the quick pass below.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Email & Password Sign-in
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const cleanEmail = email.trim().toLowerCase();

    // Check if logging in as Admin
    if (cleanEmail === ADMIN_EMAIL.toLowerCase()) {
      localStorage.setItem("aquaterra_admin_auth", ADMIN_EMAIL);
      setSuccess("Authenticated as Master Admin. Directing to Admin Panel...");
      setTimeout(() => router.push("/admin"), 800);
      return;
    }

    if (!isFirebaseConfigured) {
      // Local fallback
      localStorage.setItem("aquaterra_demo_user", JSON.stringify({ email: cleanEmail }));
      setSuccess("Signed in successfully!");
      setTimeout(() => router.push(nextUrl || "/account"), 800);
      return;
    }

    try {
      const res = await signInWithEmailAndPassword(auth, cleanEmail, password);
      if (res.user.email?.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase()) {
        localStorage.setItem("aquaterra_admin_auth", ADMIN_EMAIL);
        router.push("/admin");
      } else {
        router.push(nextUrl || "/account");
      }
    } catch {
      setError("Incorrect email credentials. Check your details or use Google Sign-in.");
    } finally {
      setLoading(false);
    }
  };

  // Quick 1-Click Master Admin Login
  const handleDirectAdminLogin = () => {
    localStorage.setItem("aquaterra_admin_auth", ADMIN_EMAIL);
    localStorage.setItem("aquaterra_demo_user", JSON.stringify({ email: ADMIN_EMAIL, name: "Arun Mohan (Admin)" }));
    setSuccess(`Master Admin token activated for ${ADMIN_EMAIL}! Entering Admin Panel...`);
    setTimeout(() => router.push("/admin"), 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 flex items-center justify-center">
      <div className="w-full max-w-lg pastel-aura-canvas rounded-[32px] p-6 sm:p-10 shadow-sm">
        
        {/* Floating Auth Card (Matches AnonVote Exact Styling) */}
        <div className="bg-white rounded-[28px] p-7 sm:p-10 w-full shadow-xl shadow-zinc-900/5 space-y-6 border border-white/60">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-zinc-100 text-[10px] font-bold font-mono text-zinc-700 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f87171]" />
                <span>FIREBASE AUTHENTICATION</span>
              </div>
              <h2 className="text-2xl font-bold text-zinc-950 tracking-tight">Studio Sign In</h2>
              <p className="text-xs text-zinc-500 mt-0.5">Access collector profiles & administration hub</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-800 shadow-2xs">
              <KeyRound className="w-5 h-5" />
            </div>
          </div>

          {/* Feedback messages */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-medium flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-start space-x-2">
              <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-600" />
              <span>{success}</span>
            </div>
          )}

          {/* Google Sign-in Button */}
          <AnimatedButton
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            variant="white"
            className="w-full py-3.5 px-4 rounded-xl text-sm font-semibold shadow-xs"
          >
            {/* Google G Logo SVG */}
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </AnimatedButton>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-zinc-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-mono uppercase text-zinc-400 absolute">
              or email sign in
            </span>
          </div>

          {/* Email form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@domain.com"
                className="w-full bg-[#f4f4f6] border border-zinc-200 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 focus:outline-none focus:bg-white focus:border-zinc-900 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#f4f4f6] border border-zinc-200 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 focus:outline-none focus:bg-white focus:border-zinc-900 transition-all"
              />
            </div>

            <AnimatedButton
              type="submit"
              disabled={loading}
              variant="dark"
              className="w-full py-3.5 px-6 rounded-xl text-[15px] font-semibold shadow-xs"
            >
              <span>{loading ? "Authenticating..." : "Sign In"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </AnimatedButton>
          </form>

          {/* Designated Master Admin One-Click Button */}
          <div className="pt-3 border-t border-zinc-100 space-y-2.5">
            <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-zinc-900 font-mono">Designated Admin ID</p>
                <p className="text-xs text-zinc-500 font-mono truncate">{ADMIN_EMAIL}</p>
              </div>
              <AnimatedButton
                onClick={handleDirectAdminLogin}
                variant="dark"
                className="px-3 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap shadow-xs"
              >
                Log In as Admin
              </AnimatedButton>
            </div>

            <div className="text-center pt-1">
              <Link href="/register" className="text-xs text-zinc-500 hover:text-zinc-900 font-medium">
                New collector? <span className="underline">Create an account</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center font-mono text-xs text-zinc-400">
          Loading authentication portal...
        </div>
      }
    >
      <LoginFormContent />
    </React.Suspense>
  );
}
