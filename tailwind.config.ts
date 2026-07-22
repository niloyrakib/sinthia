import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F1222",
        muted: "#64708A",
        line: "#E7E9F3",
        surface: "#F7F8FC",
        brand: {
          violet: "#6D5AFE",
          blue: "#4F7DFF",
          cyan: "#3ECBE0",
          pink: "#F4548C",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,18,34,0.04), 0 8px 24px -12px rgba(15,18,34,0.10)",
        cardHover: "0 4px 8px rgba(15,18,34,0.06), 0 20px 36px -14px rgba(109,90,254,0.24)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #6D5AFE 0%, #4F7DFF 38%, #3ECBE0 70%, #F4548C 100%)",
        "hero-gradient": "linear-gradient(135deg, #EDE9FF 0%, #E6EEFF 45%, #FBE4EF 100%)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease-out both",
        floaty: "floaty 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
