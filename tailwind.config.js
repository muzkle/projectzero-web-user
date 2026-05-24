/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#0f0b1a',
          card: '#1a1230',
          elevated: '#241a3d',
        },
        accent: {
          DEFAULT: '#a855f7',
          light: '#c084fc',
          dark: '#7e22ce',
          glow: '#9333ea',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow':
          'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(168,85,247,0.35), transparent)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        unlock: 'unlock 0.6s ease-out forwards',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(168,85,247,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(168,85,247,0.6)' },
        },
        unlock: {
          '0%': { transform: 'scale(0.8) rotate(-5deg)', opacity: '0' },
          '60%': { transform: 'scale(1.05) rotate(2deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
