"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminOrdersRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin?tab=orders");
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center font-mono text-xs text-zinc-500">
      Navigating to Orders Management...
    </div>
  );
}
