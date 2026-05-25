import uiPreset from '@muzkle/ui/tailwind.preset.js';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [uiPreset],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@muzkle/ui/dist/**/*.js',
    './node_modules/@muzkle/ui/src/**/*.css',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow':
          'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(168,85,247,0.35), transparent)',
      },
      animation: {
        unlock: 'unlock 0.6s ease-out forwards',
      },
      keyframes: {
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
