import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: undefined, // white-first design only — no dark mode by spec
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FEFEFE",
        primary: {
          DEFAULT: "#6366F1",
          50: "#EEF0FF",
          100: "#E0E3FF",
          200: "#C6CAFF",
          300: "#A5ABFF",
          400: "#8489FA",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
        },
        secondary: {
          DEFAULT: "#8B5CF6",
          50: "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95",
        },
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
        border: "#E5E7EB",
        ink: {
          DEFAULT: "#111827", // primary text
          muted: "#6B7280", // secondary text
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
        "card-lg": "24px",
      },
      boxShadow: {
        soft: "0 2px 8px 0 rgb(17 24 39 / 0.04), 0 1px 2px 0 rgb(17 24 39 / 0.03)",
        "soft-lg":
          "0 12px 32px -8px rgb(17 24 39 / 0.10), 0 4px 12px -4px rgb(17 24 39 / 0.06)",
        "soft-xl":
          "0 24px 48px -12px rgb(17 24 39 / 0.14), 0 8px 20px -6px rgb(17 24 39 / 0.08)",
        glass: "0 8px 32px 0 rgb(99 102 241 / 0.10)",
      },
      backdropBlur: {
        glass: "16px",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "0.45" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        shimmer: "shimmer 2s infinite linear",
        ripple: "ripple 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      maxWidth: {
        container: "1440px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};

export default config;
