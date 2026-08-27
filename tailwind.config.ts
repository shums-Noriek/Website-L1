import type { Config } from "tailwindcss";

/**
 * Noriek design tokens, lifted from the Figma landing page.
 * Colours are the exact hex values used across the artboard; the
 * "brand" scale is the warm brown/bronze family the whole site sits on.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // All copy is black per brand direction; the `ink`/`bronze` names are
        // kept so components don't need touching.
        ink: {
          DEFAULT: "#0a0a0a",
          soft: "#0a0a0a",
          softer: "#0a0a0a",
        },
        bronze: {
          DEFAULT: "#0a0a0a",
          dark: "#0a0a0a",
        },
        cream: {
          DEFAULT: "#f4efe8", // section + card background
          nav: "#f3efe7", // nav text on dark
        },
        sand: {
          100: "#faf7f2",
          200: "#efe9e0",
        },
        taupe: {
          DEFAULT: "#e6ded3", // numerals on the dark Edge cards
          deep: "#1c1c1c", // Vision watermark — near-black
        },
      },
      fontFamily: {
        // One typeface across the whole site.
        display: ["var(--font-sans)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        script: ["var(--font-sans)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        sans: ["var(--font-sans)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      borderRadius: {
        card: "35px",
        panel: "30px",
        band: "20px",
        thumb: "15px",
      },
      maxWidth: {
        shell: "1512px",
        content: "1272px",
      },
      letterSpacing: {
        nav: "0.15em",
        hero: "0.25em",
      },
      keyframes: {
        marquee: {
          from: { transform: "translate3d(0,0,0)" },
          to: { transform: "translate3d(-50%,0,0)" },
        },
      },
      animation: {
        marquee: "marquee var(--marquee-duration, 60s) linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
