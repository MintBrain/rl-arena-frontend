/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#41419D",
        second: "#DBDEE5",
        accentColor: "#4038CE",
        text: "#000000",
        textSecondary: "#34343B",
        background: {primary: '#FFFFFF'}
      },
      fontFamily: {
        default: 'Roboto, sans-serif',
        inter: "Inter, sans-serif",
        segoe: "Segoe UI, sans-serif",
      },
      fontSize: {
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['20px', '28px'],
        xl: ['24px', '32px'],
        xxl: ['38px', '46px'],
      }
    },
  },
  plugins: [],
};
