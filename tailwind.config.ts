import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 12px 30px rgba(2, 6, 23, 0.10)",
      },
      borderRadius: {
        "2xl": "1.25rem",
      },
      backgroundImage: {
        "noise": "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.06) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
} satisfies Config;
