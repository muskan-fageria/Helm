import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gold: {
          DEFAULT: "var(--accent-gold)",
          hover: "var(--accent-gold-hover)",
        },
        teal: {
          DEFAULT: "var(--accent-teal)",
        },
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        card: "var(--card-bg)",
        cardBorder: "var(--card-border)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
