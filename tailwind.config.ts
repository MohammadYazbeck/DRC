import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1a4b87",
        border: "#cccccc",
        paper: "#ffffff",
        ink: "#102033",
        mist: "#f6fbff",
        aqua: "#10a7b5",
        leaf: "#55a86f",
        blush: "#d9468f",
        petal: "#ffeaf4",
        lemon: "#fff4b8",
        mint: "#e3f8ed",
        sky: "#e6f4ff",
        lavender: "#f0ecff"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(16, 32, 51, 0.09)",
        pop: "0 20px 0 rgba(26, 75, 135, 0.08), 0 24px 55px rgba(16, 32, 51, 0.12)",
        glow: "0 28px 70px rgba(217, 70, 143, 0.18)"
      },
      fontFamily: {
        english: ["Quicksand", "Myriad Pro", "Segoe UI", "Arial", "sans-serif"],
        arabic: ["Tajawal", "Tahoma", "Arial", "sans-serif"],
        secondary: ["Myriad Pro", "Segoe UI", "Arial", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
