/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/context/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0B0C10",
        navy: "#121722",
        gold: "#E8C88C",
        "gold-dark": "#C9A96E",
        cream: "#F0E9DA",
        muted: "#8A8FA8",
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(to bottom, rgba(11,12,16,0) 0%, rgba(11,12,16,0.7) 60%, #0B0C10 100%)",
      },
    },
  },
  plugins: [],
  safelist: ["border-white/8", "bg-white/8"],
};
