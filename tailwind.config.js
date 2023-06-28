/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gap: {
        18: "4.5rem",
        19: "4.75rem",
      },
      colors: {
        "gradient-orange": "#FF9E71",
        "gradient-pink": "#FFA6F6",
        "gradient-blue": "#01C7F5",
        "dim-emerald": "#EAFFF8",
        "0A0A0A": "#0A0A0A",
        "FAFAFA": "#FAFAFA",
        greenish: "#45fec4",
        primary: "#C1DEC4",
        error: "#FE4545",
        "343434": "#343434",
        text: {
          emphasized: '#333333',
          subdued: '#737373',
        },
      },
      fontFamily: {
        drukWide: ['var(--font-drukWide)', 'DrukWide', 'sans-serif'],
        mono: ['Favorit', 'FavoritStd', 'FT88', 'mono'],
        favorit: ['Favorit', 'mono'],
        favoritStd: ['var(--font-favoritStd)', 'FavoritStd', 'mono'],
        ft88: ['FT88', 'mono'],
        sans: ['var(--font-ntDapper)', 'NTDapper', 'sans-serif'],
      },
      backgroundImage: {
        pressly: "url('/static/images/background.png')",
        border: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='white' stroke-width='3' stroke-dasharray='5%2c 8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
      },
      animation: {
        textgradient: "textgradient 10s ease infinite",
        gradient: "gradient 4s ease infinite",
        rotate: "rotate 10s linear infinite",
      },
      
      keyframes: {
        textgradient: {
          "0%": { "background-position": "34%" },
          "50%": { "background-position": "70% center" },
          "100%": { "background-position": "34%" },
        },
        rotate: {
          "0%": {
            "transform": "rotateZ(0deg)",
          },
          "100%": {
            "transform": "rotateZ(359deg)",
          }
        },
        gradient: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "100% 100%",
            "background-position": "right center",
          },
        },
      },
      zIndex: {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
      },
      lineHeight: {
        1: 1,
        1.1: 1.1,
        1.14: 1.14,
        1.15: 1.15,
        1.2: 1.2,
        1.3: 1.3,
        1.34: 1.34,
        1.4: 1.4,
        1.5: 1.5,
        1.54: 1.54,
        1.7: 1.7,
      },
      letterSpacing: {
        0.03: '0.03em',
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      desktop: "2000px",
    },
  },
  plugins: [],
};
