module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "2xl": { max: "1535px" },
      xl: { max: "1279px" },
      lg: { max: "1023px" },
      md: { max: "767px" },
      sm: { max: "639px" },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        animatedgradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      backgroundSize: {
        "300%": "300%",
      },
      animation: {
        gradient: "animatedgradient 6s ease infinite alternate",
      },
      colors: {
        black: {
          50: "#010101",
          100: "rgba(16, 16, 16, 1)",
          150: "#1E1F23",
          200: "#1a1a1a",
          300: "#121214",
          400: "#d2bab0",
          500: "#bfa094",
          600: "#a18072",
          700: "#977669",
          800: "#846358",
          900: "#43302b",
        },
      },
      boxShadow: {
        "3xl": "0 0 40px 0px rgba(0, 0, 0, 0.1)",
      },
      maxHeight: {
        600: "600px",
        700: "700px",
        800: "800px",
      },
      maxWidth: {
        1300: "1300px",
        "105%": "105%",
        600: "600px",
        700: "700px",
        800: "800px",
        400: "400px",
      },
      width: {
        "1/7": "14.2857143%",
        "2/7": "28.5714286%",
        "3/7": "42.8571429%",
        "4/7": "57.1428571%",
        "5/7": "71.4285714%",
        "6/7": "85.7142857%",
        "110%": "110%",
        600: "600px",
        700: "700px",
        800: "800px",
        1300: "1300px",
      },
      height: {
        "1/7": "14.2857143%",
        "2/7": "28.5714286%",
        "3/7": "42.8571429%",
        "4/7": "57.1428571%",
        "5/7": "71.4285714%",
        "6/7": "85.7142857%",
        500: "500px",
        600: "600px",
        700: "700px",
        800: "800px",
        1300: "1300px",
      },
      screens: {
        phone: {
          raw: "(max-width: 700px)",
        } /* be aware here cuh, make sure that if the width of the screen is less then 600px the upload test is set to text-sm */,
      },
    },
  },
  plugins: [],
};
