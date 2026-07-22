"use client";

import { useEffect, useState } from "react";
import { UserPlus } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { listUsers, updateUserRole } from "@/lib/admin-queries";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useToast } from "@/lib/toast-context";
import { ROLE_LABEL } from "@/lib/auth-context";
import type { UserRole } from "@/lib/types";

interface UserRow {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[] | null>(null);
  const [form, setForm] = useState({ uid: "", name: "", email: "", role: "author" as UserRole });
  const { push } = useToast();

  async function reload() {
    setUsers((await listUsers()) as UserRow[]);
  }
  useEffect(() => {
    reload();
  }, []);

  async function onAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!form.uid.trim()) return;
    await setDoc(doc(db, "users", form.uid.trim()), {
      name: form.name,
      email: form.email,
      role: form.role,
      createdAt: new Date().toISOString(),
    });
    push("success", "User profile added");
    setForm({ uid: "", name: "", email: "", role: "author" });
    reload();
  }

  return (
    <>
      <AdminPageHeader title="Users" description="Manage admin panel access and roles." />
      <div className="grid gap-6 px-6 pb-10 sm:px-8 lg:grid-cols-[1fr_320px]">
        <div className="rounded-xl2 border border-line bg-white shadow-card">
          {users === null ? (
            <p className="p-6 text-sm text-muted">Loading...</p>
          ) : users.length === 0 ? (
            <p className="p-6 text-sm text-muted">No user profiles yet — add one after creating the Firebase Auth account.</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs font-semibold uppercase tracking-wide text-muted">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-line last:border-0">
                    <td className="px-4 py-3 font-medium text-ink">{u.name || "—"}</td>
                    <td className="px-4 py-3 text-muted">{u.email}</td>
                    <td className="px-4 py-3">
                      <select
                        defaultValue={u.role}
                        onChange={async (e) => {
                          await updateUserRole(u.id, e.target.value);
                          push("success", "Role updated");
                        }}
                        className="rounded-lg border border-line px-2.5 py-1.5 text-sm focus:border-brand-violet focus:outline-none"
                      >
                        {(Object.keys(ROLE_LABEL) as UserRole[]).map((r) => (
                          <option key={r} value={r}>{ROLE_LABEL[r]}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <form onSubmit={onAdd} className="h-fit rounded-xl2 border border-line bg-white p-5">
          <h3 className="mb-1 font-display text-sm font-bold text-ink">Add User Profile</h3>
          <p className="mb-4 text-xs text-muted">
            Create the account in Firebase Auth first, then paste its UID here to grant admin panel access.
          </p>
          <label className="mb-1.5 block text-sm font-medium text-ink">Firebase Auth UID</label>
          <input value={form.uid} onChange={(e) => setForm({ ...form, uid: e.target.value })} className="mb-3 w-full rounded-xl border border-line px-4 py-2.5 text-sm focus:border-brand-violet focus:outline-none" />
          <label className="mb-1.5 block text-sm font-medium text-ink">Name</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mb-3 w-full rounded-xl border border-line px-4 py-2.5 text-sm focus:border-brand-violet focus:outline-none" />
          <label className="mb-1.5 block text-sm font-medium text-ink">Email</label>
          <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mb-3 w-full rounded-xl border border-line px-4 py-2.5 text-sm focus:border-brand-violet focus:outline-none" />
          <label className="mb-1.5 block text-sm font-medium text-ink">Role</label>
          <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as UserRole })} className="mb-4 w-full rounded-xl border border-line px-4 py-2.5 text-sm focus:border-brand-violet focus:outline-none">
            {(Object.keys(ROLE_LABEL) as UserRole[]).map((r) => (
              <option key={r} value={r}>{ROLE_LABEL[r]}</option>
            ))}
          </select>
          <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-card">
            <UserPlus className="h-4 w-4" /> Add User
          </button>
        </form>
      </div>
    </>
  );
}
