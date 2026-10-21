"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus, ArrowRight, ShieldCheck } from "lucide-react";
import { auth, isFirebaseConfigured } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AnimatedButton } from "@/components/AnimatedButton";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isFirebaseConfigured) {
      localStorage.setItem("aquaterra_demo_user", JSON.stringify({ email, name }));
      router.push("/account");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/account");
    } catch {
      setError("Registration encountered an error. Please try another email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 flex items-center justify-center">
      <div className="w-full max-w-lg pastel-aura-canvas rounded-[32px] p-6 sm:p-10 shadow-sm">
        
        <div className="bg-white rounded-[24px] p-8 sm:p-10 w-full shadow-xl shadow-zinc-900/5 space-y-6 border border-white/60">
          
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-zinc-100 text-[10px] font-bold font-mono text-zinc-700 mb-1">
                <span>ONBOARDING</span>
              </div>
              <h2 className="text-xl font-bold text-zinc-950 tracking-tight">Create Collector Profile</h2>
              <p className="text-xs text-zinc-500 mt-0.5">Track builds, warranties, and care schedules</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-800">
              <UserPlus className="w-4 h-4" />
            </div>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Maya Sharma"
                className="w-full bg-[#f4f4f6] border border-zinc-200 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 focus:outline-none focus:bg-white focus:border-zinc-900 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="maya@example.com"
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
              <span>{loading ? "Registering..." : "Create Account"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </AnimatedButton>
          </form>

          <div className="text-center pt-2 border-t border-zinc-100">
            <Link href="/login" className="text-xs text-zinc-500 hover:text-zinc-900 font-medium">
              Already have a profile? <span className="underline">Sign In</span>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
