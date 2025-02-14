import { heroui } from "@heroui/react";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        backgroundGrey: "var(--background-lightGrey)",
        borderGrey: "var(--border-grey)",
      },
    },
  },
  plugins: [
    heroui({
      layout: {
        radius: {
          small: "5px",
          medium: "8px",
          large: "10px",
        },
      },
      themes: {
        light: {
          colors: {
            primary: {
              foreground: "#FFFFFF",
              DEFAULT: "#506efe",
            },
            danger: {
              foreground: "#FFFFFF",
              DEFAULT: "#ea5151",
            },
          },
        },
        dark: {
          colors: {
            primary: {
              foreground: "#FFFFFF",
              DEFAULT: "#506efe",
            },
          },
        },
      },
    }),
  ],
} satisfies Config;
