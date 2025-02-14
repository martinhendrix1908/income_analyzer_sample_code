/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      screens: {
        sm: "576px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1440px",
      },
      borderRadius: {
        DEFAULT: "4px",
        md: "8px",
        lg: "12px",
        xl: "20px",
      },
      fontSize: {
        xxs: "10px",
        xs: "12px",
        sm: "14px",
        md: "21px",
        base: "16px",
        "[xl]": "36px",
        "[1xl]": "32px",
        "[2xl]": "28px",
        "[3xl]": "24px",
        "[4xl]": "20px",
        "[5xl]": "18px",
        "[6xl]": "16px",
      },
      fontFamily: {
        sans: '"Roboto", sans-serif',
      },
      spacing: {
        "1px": "1px",
        "[t0px]": "0px",
        "[t0.5px]": "2px",
        "[t1px]": "4px",
        "[t1.5px]": "6px",
        "[t2px]": "8px",
        "[t2.5px]": "10px",
        "[t3px]": "12px",
        "[t4px]": "16px",
        "[t5px]": "20px",
        "[t6px]": "24px",
        "[t7px]": "28px",
        "[t8px]": "32px",
        "[t9px]": "36px",
        "[t10px]": "40px",
        "[t11px]": "44px",
        "[t12px]": "48px",
        "[t13px]": "52px",
        "[t14px]": "56px",
        "[t15px]": "60px",
        "[t16px]": "64px",
        "[t17px]": "68px",
        "[t18px]": "72px",
        "[t19px]": "76px",
        "[t20px]": "80px",
      },
      colors: {
        good: "#4AAF05",
        okay: "#F9B300",
        bad: "#E50707",

        rgbSecondary: "rgb(107 114 128)",

        teal: {
          DEFAULT: "#3D98C4",
          400: "#87D0FD",
        },
        warn: "#C49C3D",

        "black-gray": "rgba(0,0,0,0.10)",

        canva: {
          DEFAULT: "#14213D",
          50: "#e0f2fe",
          100: "#2F80ED",
          200: "#0000EE",
        },
        red: {
          DEFAULT: "#BE0027",
          100: "#FF3B30",
        },
        leafy: {
          DEFAULT: "#146C27",
          100: "#B2FFC3",
          200: "#2C9F45",
          300: "#008000",
        },
        white: {
          DEFAULT: "#FFFFFF",
        },
        black: {
          DEFAULT: "#000000",
        },
        naro: {
          DEFAULT: "#F7F6F0",
          100: "#EEEEEE",
          200: "#E1E1E1",
          300: "#9C9C9C",
          400: "#444444",
          500: "#4B4B4B",
          600: "#222222",
          700: "#1C1B1F",
          800: "#E7E7E7",
          900: "#78788052",
          1000: "#DDDDDD"
        },
        magenta: {
          DEFAULT: "#C472B1",
        },
        parrot: {
          DEFAULT: "#98C43D",
          100: "#FAFFF0",
          200: "#E4FFAD",
          300: "#CEFF6A",
          400: "#09814A"
        },
        yellow: {
          DEFAULT: "#FFFF00",
          400: "#FFCC00",
        },
        orange: {
          DEFAULT: "#FF8400",
        },
        blue: {
          DEFAULT: "#2563eb",
          500: "#007AFF",
        },
      },
      boxShadow: {
        "3xl": "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        "4xl": "0px 2px 8px 0px rgba(0, 0, 0, 0.25)",
        "5xl": "-2px 1px 4px 0px rgba(0, 0, 0, 0.30)",
        inset: "inset 4px 0px 0px 0px #222222",
      },
      opacity: {
        85: ".85",
        50: ".50",
      },
      minWidth: {
        "8px": "8px",
        "16px": "16px",
        "35px": "35px",
        "64px": "64px",
        "42px": "42px",
        "1285px": "1285px",
        "1023px": "1023px",
        "100px": "100px",
        "150px": "150px",
        "200px": "200px",
        "240px": "240px",
        "280px": "280px",
        "288px": "288px",
        "350px": "350px",
        "scroll-width": "calc(100% + 18px)",
        "table-scroll-width": "calc(100% + 4px)",
      },
      maxWidth: {
        "2100px": "2100px",
        "155px": "155px",
        "250px": "250px",
        "264px": "264px",
        "300px": "300px",
        "320px": "320px",
        "323px": "323px",
        "350px": "350px",
        "370px": "370px",
        "456px": "456px",
        "720px": "720px",
        "875px": "875px",
      },
      height: {
        "calc": "calc(100vh - 176px)",
      },
      maxHeight: {
        "35px": "35px",
        "56px": "56px",
        "210px": "210px",
        "242px": "242px",
        "500px": "500px",
      },
      backgroundImage: {
        checkbox: "url('/images/icon-check.svg')",
        "checkbox-parrot": "url('/images/icon-check-parrot.svg')",
      },
      keyframes: {
        wiggle: {
          "100%": { transform: "scale(5)", opacity: "0" },
        },
        move: {
          '0%': { left: '0px' },
          '50%': { left: '36px' },
          '100%': { left: '32px' }
        },
        move1: {
          '0%': { left: '0px' },
          '50%': { left: '-36px' },
          '100%': { left: '-32px' }
        },
        move3: {
          '0%': { left: '32px' },
          '50%': { left: '-4px' },
          '100%': { left: '0px' }
        },
        move4: {
          '0%': { left: '-32px' },
          '50%': { left: '4px' },
          '100%': { left: '0px' }
        },
        "IA-switch-1": {
          '0%': {
            transform: 'translateX(-32px) rotate(0deg)',
          },
          '33%': {
            transform: 'translateX(48px) rotate(45deg)',
          },
          '66%': {
            transform: 'translateX(-32px) rotate(-45deg)',
          },
          '100%': {
            transform: 'translateX(2px) rotate(45deg)',
          },
        },
        "IA-switch-2": {
          '0%': {
            transform: 'translateX(32px) rotate(0deg)',
          },
          '33%': {
            transform: 'translateX(-48px) rotate(45deg)',
          },
          '66%': {
            transform: 'translateX(32px) rotate(-45deg)',
          },
          '100%': {
            transform: 'translateX(-2px) rotate(45deg)',
          },
        },
      },
      animation: {
        wiggle: "wiggle 2s ease-in-out 0.0s infinite",
        wiggle1: "wiggle 2s ease-in-out 0.3s infinite",
        wiggle2: "wiggle 2s ease-in-out 0.6s infinite",
        move: 'move 1s ease-in-out 0.0s forwards',
        move1: 'move1 1s ease-in-out 0.0s forwards',
        move3: 'move3 1s ease-in-out 0.0s forwards',
        move4: 'move4 1s ease-in-out 0.0s forwards',
        "IA-switch-1": 'IA-switch-1 2s ease-in-out infinite alternate',
        "IA-switch-2": 'IA-switch-2 2s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};
