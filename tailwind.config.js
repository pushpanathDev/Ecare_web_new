/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wave1: {
          "0%, 1%": {
            zIndex: "1",
            background: "#EB4335",
            width: "0px",
            height: "0px",
            opacity: "1",
          },
          "25%": {
            zIndex: "1",
            background: "#EB4335",
            width: "800px",
            height: "800px",
            opacity: "1",
          },
          "26%": {
            zIndex: "3",
            background: "#34A853",
            width: "0px",
            height: "0px",
            opacity: "1",
          },
          "50%": {
            zIndex: "3",
            background: "#34A853",
            width: "800px",
            height: "800px",
            opacity: "1",
          },
          "70%": {
            zIndex: "3",
            background: "#34A853",
            width: "800px",
            height: "800px",
            opacity: "1",
          },
          "100%": {
            zIndex: "3",
            background: "#34A853",
            width: "800px",
            height: "800px",
            opacity: "1",
          },
        },
        wave2: {
          "0%": {
            zIndex: "2",
            background: "#FBBC05",
            width: "0px",
            height: "0px",
            opacity: "1",
          },
          "11%": {
            zIndex: "2",
            background: "#FBBC05",
            width: "0px",
            height: "0px",
            opacity: "1",
          },
          "35%": {
            zIndex: "2",
            background: "#FBBC05",
            width: "800px",
            height: "800px",
            opacity: "1",
          },
          "39%": {
            zIndex: "2",
            background: "#FBBC05",
            width: "800px",
            height: "800px",
            opacity: "1",
          },
          "40%": {
            zIndex: "4",
            background: "#4285F4",
            width: "0px",
            height: "0px",
            opacity: "1",
          },
          "64%": {
            zIndex: "4",
            background: "#4285F4",
            width: "800px",
            height: "800px",
            opacity: "1",
          },
          "100%": {
            zIndex: "4",
            background: "#4285F4",
            width: "800px",
            height: "800px",
            opacity: "1",
          },
        },
        pulseRhythmic: {
          "0%, 100%": { opacity: "0.2", transform: "scale(0.95)" },
          "50%": { opacity: "1", transform: "scale(1)" },
        },
        carePulse: {
          "0%, 100%": { transform: "scale(0.85)", opacity: "0.6" },
          "50%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        wave1: "wave1 2.5s ease-in-out forwards",
        wave2: "wave2 2.5s ease-in-out forwards",
        pulseRhythmic: "pulseRhythmic 1.4s ease-in-out infinite",
        carePulse: "carePulse 1.2s ease-in-out infinite",
      },
      colors: {
        "care-blue": "#4A90E2", // primary brand color for elderly care app
      },
    },
  },
  plugins: [],
};
