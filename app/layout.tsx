import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sinthia.top"),
  title: {
    default: "Sinthia — Games, Tools & Knowledge for Everyone",
    template: "%s | Sinthia",
  },
  description:
    "Play free web games, use handy online tools, and read practical guides — all in one place, no sign-up required.",
  openGraph: {
    type: "website",
    siteName: "Sinthia",
    title: "Sinthia — Games, Tools & Knowledge for Everyone",
    description:
      "Play free web games, use handy online tools, and read practical guides — all in one place.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
