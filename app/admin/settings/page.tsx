"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminSettingsRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin?tab=settings");
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center font-mono text-xs text-zinc-500">
      Navigating to Settings & Configuration...
    </div>
  );
}
