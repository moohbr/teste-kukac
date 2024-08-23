import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'old-rose': {
          '50': '#fbf5f5',
          '100': '#f6eaea',
          '200': '#efd9d9',
          '300': '#e3bebe',
          '400': '#c98686',
          '500': '#be7575',
          '600': '#a75b5b',
          '700': '#8c4949',
          '800': '#753f3f',
          '900': '#633939',
          '950': '#341b1b',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animated')
  ],
};

export default config;