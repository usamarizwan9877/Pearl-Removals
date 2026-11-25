import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", md: "2rem", xl: "2.5rem" } },
    extend: {
      colors: {
        ink: { DEFAULT: "#0F2340", 800: "#13294A", 700: "#1B3458", 500: "#4B5B73" },
        ivory: { DEFAULT: "#F5F1EA", 50: "#FAF8F4", 100: "#F5F1EA", 200: "#E9E3D8" },
        gold: { DEFAULT: "#C4A574", light: "#E2CFA8", deep: "#97794A" },
        stone: { DEFAULT: "#8B8F97", line: "#E6E0D4" },
        sea: { DEFAULT: "#A8D5C5", light: "#D4EBE2", deep: "#5E9C88", sage: "#7E9E8F" },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        logo: ["var(--font-logo)", "Georgia", "serif"],
      },
      letterSpacing: { eyebrow: "0.28em" },
      borderRadius: { arch: "999px 999px 28px 28px" },
      boxShadow: {
        soft: "0 30px 60px -30px rgba(15,35,64,0.35)",
        card: "0 1px 0 rgba(15,35,64,0.04), 0 20px 40px -24px rgba(15,35,64,0.25)",
      },
      keyframes: {
        drive: { "0%": { offsetDistance: "0%" }, "100%": { offsetDistance: "100%" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
      },
      animation: { marquee: "marquee 40s linear infinite" },
    },
  },
  plugins: [],
};
export default config;
