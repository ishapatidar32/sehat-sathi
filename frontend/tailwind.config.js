/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#28a745", dark: "#1e7e34", darker: "#218838" },
        teal: "#20c997",
        dark: "#2c3e50",
        danger: "#dc3545",
        muted: "#6c757d",
        soft: "#f8f9fa",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Segoe UI", "Tahoma", "Geneva", "Verdana", "sans-serif"],
      },
      keyframes: {
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
        pulseRing: {
          "0%": { boxShadow: "0 0 0 0 rgba(40,167,69,0.7)" },
          "70%": { boxShadow: "0 0 0 10px rgba(40,167,69,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(40,167,69,0)" },
        },
      },
      animation: {
        heartbeat: "heartbeat 2s ease-in-out infinite",
        pulseRing: "pulseRing 2s infinite",
      },
    },
  },
  plugins: [],
};