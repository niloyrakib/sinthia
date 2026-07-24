"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Gamepad2,
  Wrench,
  Tag,
  FolderTree,
  Image as ImageIcon,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import { signOut } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import { useAuth, ROLE_LABEL } from "@/lib/auth-context";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/posts", label: "Posts", icon: FileText },
  { href: "/admin/games", label: "Games", icon: Gamepad2 },
  { href: "/admin/tools", label: "Tools", icon: Wrench },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/tags", label: "Tags", icon: Tag },
  { href: "/admin/media", label: "Media", icon: ImageIcon },
  { href: "/admin/users", label: "Users", icon: Users, adminOnly: true },
  { href: "/admin/settings", label: "Settings", icon: Settings, adminOnly: true },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { profile, role } = useAuth();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-line bg-white">
      <div className="flex h-[68px] items-center border-b border-line px-5">
        <span className="font-display text-lg font-extrabold text-ink">SINTHIA</span>
        <span className="ml-2 rounded-md bg-surface px-2 py-0.5 text-xs font-semibold text-muted">Admin</span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {NAV.filter((item) => !item.adminOnly || role === "admin").map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                active ? "bg-brand-violet/10 text-brand-violet" : "text-ink/70 hover:bg-surface"
              }`}
            >
              <item.icon className="h-4.5 w-4.5" /> {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-line p-4">
        <div className="mb-3 flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-gradient text-sm font-bold text-white">
            {profile?.name?.[0]?.toUpperCase() ?? "?"}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink">{profile?.name ?? "Loading..."}</p>
            <p className="text-xs text-muted">{role ? ROLE_LABEL[role] : ""}</p>
          </div>
        </div>
        <button
          onClick={() => signOut(getFirebaseAuth())}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-ink/70 hover:bg-surface"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>
    </aside>
  );
}
