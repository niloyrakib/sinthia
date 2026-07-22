"use client";

import { useRef, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Upload, Loader2, ImageOff } from "lucide-react";
import { storage, db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";

export default function MediaUploader({
  value,
  onChange,
  label = "Image",
}: {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { firebaseUser } = useAuth();

  async function handleFile(file: File) {
    setError(null);
    setUploading(true);
    try {
      const path = `media/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      await addDoc(collection(db, "media"), {
        url,
        path,
        fileName: file.name,
        contentType: file.type,
        size: file.size,
        uploadedBy: firebaseUser?.uid ?? "unknown",
        createdAt: serverTimestamp(),
      });

      onChange(url);
    } catch {
      setError("Upload failed. Check your Storage rules and connection.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">{label}</label>
      <div
        onClick={() => inputRef.current?.click()}
        className="flex h-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line bg-surface text-sm text-muted transition hover:border-brand-violet"
      >
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="Preview" className="h-full w-full rounded-xl object-cover" />
        ) : uploading ? (
          <Loader2 className="h-6 w-6 animate-spin text-brand-violet" />
        ) : (
          <>
            <Upload className="h-6 w-6" />
            Click to upload
          </>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      {error && (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-600">
          <ImageOff className="h-3.5 w-3.5" /> {error}
        </p>
      )}
    </div>
  );
}
