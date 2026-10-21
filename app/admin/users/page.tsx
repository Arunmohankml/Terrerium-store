"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminUsersRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin");
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center font-mono text-xs text-zinc-500">
      Navigating to Master Admin Hub...
    </div>
  );
}
