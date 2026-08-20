import { Inter } from "next/font/google";

/**
 * Inter is loaded via next/font so it is self-hosted at build time
 * (no runtime request to Google Fonts, no layout shift, GDPR-safe).
 */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});
