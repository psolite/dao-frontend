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
        primary: '#0099cc',
        secondary: '#cd9cf8',
        tertiary: '#09114A',
        black: '#09114a',
      },
      container: {
        center: true,
        //padding: '2rem',
      },
      maxWidth: {
        '5xl': '1081px',
      },
      screens: {
        xs: '480px',
        ss: '620px',
        sm: '768px',
        mm: '993px',
        md: '1020px',
        lg: '1200px',
        xl: '1700px',
      },
    },
  },
  plugins: [],
};
export default config;
