import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
          // Custom breakpoints for responsive utilities
          screens: {
            'sm': '354px',
            'md': '550px',
            'lg': '700px',
            'xl': '750px',
            '2xl': '800px',
          },
          // change in some style of tailwind 
          container: {
            center: true, // Center the container
            padding: '1rem', // Default padding for all screens
            screens: {
              sm: '354px', // Full width on small screens
              md: '550px', // Custom width on medium screens
              lg: '700px', // Custom width on large screens
              xl: '750px', // Custom width on extra-large screens
              '2xl': '800px', // Custom width on 2XL screens
            },
          },
    extend: {
      colors: {
        mColor:"#F5F4F4",
        sColor:"#4E71FF",
        tColor:"#8DD8FF"
      },

    },
  },
  plugins: [],
} satisfies Config;
