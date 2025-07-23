module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"], // include all JSX files too
  theme: {
    extend: {
      colors: {
        'deep-burgundy': '#800020',
        'gold': '#FFD700',
        'off-white': '#FAF9F6',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
      fontSize: {
        'fs-1': '3rem',      // h1
        'fs-2': '2.4rem',    // h2
        'fs-3': '1.92rem',   // h3
        'fs-4': '1.54rem',   // h4
        'fs-5': '1.25rem',   // large body
        'fs-6': '1rem',      // normal body
        'fs-7': '0.875rem',  // small text
      },
      lineHeight: {
        tight: '1.2',
        normal: '1.6',
      },
      letterSpacing: {
        tight: '-0.5px',
        wide: '0.5px',
      },
    },
  },
  plugins: [],
};
