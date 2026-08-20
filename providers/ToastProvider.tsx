"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#111827",
          color: "#FEFEFE",
          borderRadius: "12px",
          fontSize: "14px",
          padding: "10px 16px",
        },
        success: { iconTheme: { primary: "#10B981", secondary: "#FEFEFE" } },
        error: { iconTheme: { primary: "#EF4444", secondary: "#FEFEFE" } },
      }}
    />
  );
}
