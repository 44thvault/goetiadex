import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        shell: {
          900: "#440b0e",
          800: "#671114",
          700: "#8f171b",
          600: "#b41f22",
          500: "#d92d2f",
          400: "#f74e49"
        },
        screen: {
          green: "#9ee2b2",
          amber: "#f5cf7b",
          dark: "#101714",
          bezel: "#1a2520"
        }
      },
      boxShadow: {
        device:
          "0 22px 50px rgba(0, 0, 0, 0.55), inset 0 2px 0 rgba(255,255,255,0.16), inset 0 -8px 18px rgba(70,0,0,0.4)",
        screen:
          "inset 0 0 0 2px rgba(18,28,24,0.9), inset 0 0 35px rgba(0,0,0,0.45), 0 12px 25px rgba(0,0,0,0.25)"
      },
      fontFamily: {
        display: ["'Trebuchet MS'", "'Segoe UI'", "sans-serif"],
        mono: ["'Courier New'", "monospace"]
      },
      animation: {
        boot: "boot 900ms ease-out both",
        flicker: "flicker 2.6s linear infinite",
        pulseRing: "pulseRing 2.4s ease-in-out infinite",
        sweep: "sweep 1.8s linear infinite",
        indicator: "indicator 1.5s ease-in-out infinite",
        breach: "breach 5s ease-in-out infinite"
      },
      keyframes: {
        boot: {
          "0%": { opacity: "0", transform: "scale(0.96) translateY(18px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" }
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "20%": { opacity: "0.97" },
          "21%": { opacity: "0.9" },
          "22%": { opacity: "1" },
          "63%": { opacity: "0.94" },
          "64%": { opacity: "1" }
        },
        pulseRing: {
          "0%, 100%": { transform: "scale(0.98)", opacity: "0.45" },
          "50%": { transform: "scale(1.02)", opacity: "0.9" }
        },
        sweep: {
          "0%": { transform: "translateY(-110%)" },
          "100%": { transform: "translateY(110%)" }
        },
        indicator: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "1" }
        },
        breach: {
          "0%, 100%": { filter: "hue-rotate(0deg)" },
          "50%": { filter: "hue-rotate(160deg)" }
        }
      }
    }
  },
  plugins: []
} satisfies Config;
