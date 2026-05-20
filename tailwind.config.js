/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2e0052",
        "primary-variant": "#4b0082",

        secondary: "#00677d",
        "secondary-light": "#4cd6fb",

        surface: "#ffffff",
        "surface-muted": "#f4f4f4",
        "surface-soft": "#eceef1",
        "surface-variant": "#e6e8eb",

        "text-primary": "#191c1e",
        "text-secondary": "#4c4451",

        "outline-variant": "#cec3d3",
      },

      boxShadow: {
        soft: "0 4px 24px -4px rgba(46,0,82,0.1)",
        medium: "0 12px 40px -4px rgba(46,0,82,0.18)",
        glow: "0 6px 24px rgba(46,0,82,0.28)",
      },

      backgroundImage: {
        "primary-gradient": "linear-gradient(135deg, #2e0052, #4b0082)",
      },
    },
  },
  plugins: [],
};
