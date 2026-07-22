"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import MediaUploader from "@/components/admin/MediaUploader";
import { db } from "@/lib/firebase";
import { useToast } from "@/lib/toast-context";
import type { SiteSettings } from "@/lib/types";

const DEFAULTS: SiteSettings = {
  siteName: "Sinthia",
  siteDescription: "Games, Tools & Knowledge for Everyone.",
  logoUrl: "",
  defaultOgImage: "",
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { push } = useToast();

  useEffect(() => {
    getDoc(doc(db, "settings", "site")).then((snap) => {
      if (snap.exists()) setSettings({ ...DEFAULTS, ...(snap.data() as SiteSettings) });
      setLoading(false);
    });
  }, []);

  async function save() {
    setSaving(true);
    try {
      await setDoc(doc(db, "settings", "site"), settings, { merge: true });
      push("success", "Settings saved");
    } catch {
      push("error", "Failed to save settings");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-8 text-sm text-muted">Loading...</div>;

  return (
    <>
      <AdminPageHeader title="Settings" description="Site-wide configuration." />
      <div className="max-w-xl space-y-5 px-6 pb-10 sm:px-8">
        <div className="rounded-xl2 border border-line bg-white p-5">
          <label className="mb-1.5 block text-sm font-medium text-ink">Site Name</label>
          <input
            value={settings.siteName}
            onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
            className="mb-4 w-full rounded-xl border border-line px-4 py-2.5 text-sm focus:border-brand-violet focus:outline-none"
          />
          <label className="mb-1.5 block text-sm font-medium text-ink">Site Description</label>
          <textarea
            value={settings.siteDescription}
            onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
            rows={2}
            className="w-full rounded-xl border border-line px-4 py-2.5 text-sm focus:border-brand-violet focus:outline-none"
          />
        </div>

        <MediaUploader label="Site Logo" value={settings.logoUrl} onChange={(url) => setSettings({ ...settings, logoUrl: url })} />
        <MediaUploader label="Default Open Graph Image" value={settings.defaultOgImage} onChange={(url) => setSettings({ ...settings, defaultOgImage: url })} />

        <button
          disabled={saving}
          onClick={save}
          className="flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-card disabled:opacity-60"
        >
          <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </>
  );
}
