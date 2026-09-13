import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--uiss-canvas) / <alpha-value>)",
        foreground: "rgb(var(--uiss-ink) / <alpha-value>)",
        border: "rgb(var(--uiss-line) / <alpha-value>)",
        ring: "rgb(var(--uiss-focus) / <alpha-value>)",
        accent: {
          DEFAULT: "rgb(var(--uiss-surface) / <alpha-value>)",
          foreground: "rgb(var(--uiss-ink) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "rgb(var(--uiss-canvas) / <alpha-value>)",
          foreground: "rgb(var(--uiss-ink) / <alpha-value>)",
        },
        primary: "rgb(var(--uiss-ink) / <alpha-value>)",
        secondary: "rgb(var(--uiss-canvas) / <alpha-value>)",
        ternary: "rgb(var(--uiss-brand) / <alpha-value>)",
        canvas: "rgb(var(--uiss-canvas) / <alpha-value>)",
        surface: "rgb(var(--uiss-surface) / <alpha-value>)",
        ink: "rgb(var(--uiss-ink) / <alpha-value>)",
        muted: "rgb(var(--uiss-muted) / <alpha-value>)",
        line: "rgb(var(--uiss-line) / <alpha-value>)",
        brand: "rgb(var(--uiss-brand) / <alpha-value>)",
        "brand-ink": "rgb(var(--uiss-brand-ink) / <alpha-value>)",
        "brand-mark": "rgb(var(--uiss-brand-mark) / <alpha-value>)",
        focus: "rgb(var(--uiss-focus) / <alpha-value>)",
        danger: "rgb(var(--uiss-danger) / <alpha-value>)",
        success: "rgb(var(--uiss-success) / <alpha-value>)",
        warning: "rgb(var(--uiss-warning) / <alpha-value>)",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        sans: ["var(--font-source-sans-3)", "Arial", "sans-serif"],
        display: ["var(--font-uiss-display)", "var(--font-source-sans-3)", "sans-serif"],
        wordmark: ["var(--font-uiss-wordmark)", "Arial", "sans-serif"],
      },
      borderRadius: {
        xl: "var(--uiss-radius-xl)",
        lg: "var(--uiss-radius-lg)",
        md: "var(--uiss-radius-md)",
        sm: "var(--uiss-radius-sm)",
      },
      boxShadow: {
        soft: "var(--uiss-shadow-soft)",
        raised: "var(--uiss-shadow-raised)",
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(to bottom, #efb631, #c78b00)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
