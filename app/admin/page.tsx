"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Gamepad2, Wrench, Users, Plus } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { listAllContent, listUsers } from "@/lib/admin-queries";
import type { Post, Game, Tool } from "@/lib/types";

export default function AdminDashboard() {
  const [counts, setCounts] = useState<{ posts: number; games: number; tools: number; users: number } | null>(null);

  useEffect(() => {
    Promise.all([
      listAllContent<Post>("posts"),
      listAllContent<Game>("games"),
      listAllContent<Tool>("tools"),
      listUsers(),
    ]).then(([posts, games, tools, users]) =>
      setCounts({ posts: posts.length, games: games.length, tools: tools.length, users: users.length })
    );
  }, []);

  const CARDS = [
    { label: "Posts", value: counts?.posts, icon: FileText, href: "/admin/posts", color: "bg-emerald-100 text-emerald-600" },
    { label: "Games", value: counts?.games, icon: Gamepad2, href: "/admin/games", color: "bg-brand-violet/10 text-brand-violet" },
    { label: "Tools", value: counts?.tools, icon: Wrench, href: "/admin/tools", color: "bg-blue-100 text-blue-600" },
    { label: "Users", value: counts?.users, icon: Users, href: "/admin/users", color: "bg-amber-100 text-amber-600" },
  ];

  return (
    <>
      <AdminPageHeader title="Dashboard" description="Overview of your content library." />
      <div className="px-6 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((c) => (
            <Link key={c.label} href={c.href} className="rounded-xl2 border border-line bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-cardHover">
              <span className={`grid h-11 w-11 place-items-center rounded-xl ${c.color}`}>
                <c.icon className="h-5 w-5" />
              </span>
              <p className="mt-4 font-display text-2xl font-extrabold text-ink">{c.value ?? "—"}</p>
              <p className="text-sm text-muted">{c.label}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/admin/posts/new" className="flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-card">
            <Plus className="h-4 w-4" /> New Post
          </Link>
          <Link href="/admin/games/new" className="flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink">
            <Plus className="h-4 w-4" /> New Game
          </Link>
          <Link href="/admin/tools/new" className="flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink">
            <Plus className="h-4 w-4" /> New Tool
          </Link>
        </div>
      </div>
    </>
  );
}
