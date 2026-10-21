"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ShieldCheck, Lock, ArrowRight, UserCheck } from "lucide-react";
import Link from "next/link";
import { auth, isFirebaseConfigured, PRIMARY_ADMIN_EMAIL } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

type AccessState = "checking" | "allowed" | "denied";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [access, setAccess] = useState<AccessState>("checking");
  const [activeAdminEmail, setActiveAdminEmail] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // 1. Check local admin token
    try {
      const localAdmin = localStorage.getItem("aquaterra_admin_auth");
      if (localAdmin && localAdmin.toLowerCase().trim() === PRIMARY_ADMIN_EMAIL.toLowerCase()) {
        setActiveAdminEmail(localAdmin);
        setAccess("allowed");
        return;
      }
    } catch {}

    // 2. Check Firebase Auth State
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        const email = user.email.toLowerCase().trim();
        const configuredAdmin = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || "care@aquaterra.in").toLowerCase().trim();

        if (email === PRIMARY_ADMIN_EMAIL.toLowerCase() || email === configuredAdmin) {
          setActiveAdminEmail(user.email);
          setAccess("allowed");
          return;
        }
      }

      // If not matching, set denied
      setAccess("denied");
    });

    return () => unsub();
  }, [pathname]);

  if (access === "checking") {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-900 animate-pulse">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <p className="text-sm font-mono font-bold text-zinc-900">
          Verifying Master Admin Credentials ({PRIMARY_ADMIN_EMAIL})...
        </p>
      </div>
    );
  }

  if (access === "denied") {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center border border-red-200">
          <Lock className="w-6 h-6" />
        </div>
        <div className="space-y-1 max-w-sm">
          <h2 className="text-xl font-bold text-zinc-950">Admin Authentication Required</h2>
          <p className="text-xs text-zinc-500">
            This management console is restricted to <strong className="text-zinc-900 font-mono">{PRIMARY_ADMIN_EMAIL}</strong>.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/login?next=/admin"
            className="px-6 py-3 rounded-xl bg-[#18181b] hover:bg-zinc-800 text-white text-xs font-semibold shadow-xs flex items-center justify-center space-x-2"
          >
            <span>Sign In as Admin</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold"
          >
            Return to Storefront
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col">
      {/* Top Admin Status Bar */}
      <div className="bg-[#18181b] text-white text-xs py-2 px-4 sm:px-8 flex items-center justify-between font-mono">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>MASTER ADMIN ACTIVE: {activeAdminEmail || PRIMARY_ADMIN_EMAIL}</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
            View Live Storefront →
          </Link>
        </div>
      </div>

      <div className="flex-1">{children}</div>
    </div>
  );
}
