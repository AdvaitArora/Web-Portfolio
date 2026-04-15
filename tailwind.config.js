/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0a0a0a",
          secondary: "#111111",
          elevated: "#1a1a1a",
        },
        line: {
          DEFAULT: "#262626",
          hover: "#404040",
        },
        ink: {
          primary: "#f5f5f5",
          secondary: "#a3a3a3",
          muted: "#525252",
        },
        accent: {
          DEFAULT: "#a855f7",
          pink: "#ec4899",
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', "Impact", "sans-serif"],
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      animation: {
        "float-slow": "float 7s ease-in-out infinite",
        "float-med": "float 5s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "fade-up": "fadeUp 0.7s ease-out forwards",
        "scroll-hint": "scrollHint 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(3deg)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 60px rgba(168, 85, 247, 0.25)" },
          "50%": { boxShadow: "0 0 100px rgba(168, 85, 247, 0.45)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scrollHint: {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "50%": { transform: "translateY(8px)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
