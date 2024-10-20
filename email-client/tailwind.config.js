/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#E54065",           // Accent color
        background: "#F4F5F9",       // Background color
        border: "#CFD2DC",           // Border color
        text: "#636363",             // Text color
        filterButton: "#E1E4EA",     // Filter Button color
        readBackground: "#F2F2F2",   // Read Background color
      }
    },
  },
  plugins: [],
}

