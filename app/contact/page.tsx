"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { db } from "@/lib/firebase";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      await addDoc(collection(db, "messages"), { ...form, createdAt: serverTimestamp() });
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <Header />
      <main className="container-page max-w-xl py-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
        <h1 className="font-display text-3xl font-extrabold text-ink">Contact Us</h1>
        <p className="mt-2 text-muted">Questions, feedback, or a broken tool to report — send it over.</p>

        {status === "sent" ? (
          <div className="mt-8 flex items-center gap-3 rounded-xl2 border border-emerald-200 bg-emerald-50 p-5 text-emerald-700">
            <CheckCircle2 className="h-5 w-5" /> Thanks — your message has been sent.
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-line px-4 py-2.5 text-sm focus:border-brand-violet focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">Email</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-line px-4 py-2.5 text-sm focus:border-brand-violet focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-xl border border-line px-4 py-2.5 text-sm focus:border-brand-violet focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:shadow-cardHover disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : <><Send className="h-4 w-4" /> Send Message</>}
            </button>
            {status === "error" && (
              <p className="text-sm text-rose-600">Something went wrong — please try again.</p>
            )}
          </form>
        )}

        <p className="mt-8 flex items-center gap-2 text-sm text-muted">
          <Mail className="h-4 w-4" /> Or email us directly at hello@sinthia.top
        </p>
      </main>
      <Footer />
    </>
  );
}
