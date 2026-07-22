"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { AuthProvider, useAuth, canAccessAdmin } from "@/lib/auth-context";
import { ToastProvider } from "@/lib/toast-context";
import AdminSidebar from "@/components/admin/AdminSidebar";

function Gate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { firebaseUser, role, loading } = useAuth();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (loading) return;
    if (!firebaseUser && !isLoginPage) router.replace("/admin/login");
    if (firebaseUser && !canAccessAdmin(role) && !isLoginPage) router.replace("/admin/login");
  }, [loading, firebaseUser, role, isLoginPage, router]);

  if (isLoginPage) return <>{children}</>;

  if (loading || !firebaseUser || !canAccessAdmin(role)) {
    return (
      <div className="grid min-h-screen place-items-center text-sm text-muted">
        Checking access...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 overflow-x-hidden bg-surface/50">{children}</div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>
        <Gate>{children}</Gate>
      </ToastProvider>
    </AuthProvider>
  );
}
