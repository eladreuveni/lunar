import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        shaking: {
          '0%': { transform: "rotate(0deg);" },
          '25%': { transform: "rotate(5deg);" },
          '50%': { transform: "rotate(0eg);" },
          '75%': { transform: "rotate(-5deg);" },
          '100%': { transform: "rotate(0deg);" }
        }
      },
      animation: {
        shake: 'shaking .5s linear infinite;'
      },
      screens: {
        "pc": "480px"
      },
      height: {
        "8v": "8vh",
        "10v": "10vh",
        "15v": "15vh",
        "20v": "20vh",
        "30v": "30vh",
        "40v": "40vh",
        "50v": "50vh",
        "60v": "60vh",
        "70v": "70vh",
        "80v": "80vh",
        "90v": "90vh",
        "100v": "100vh",
      },
    },
  },
  plugins: [],
}
export default config
