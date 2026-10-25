/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Cinematic dark neutrals
        ink: {
          950: '#070710',
          900: '#0a0a0f',
          850: '#0f0f18',
          800: '#14141f',
          700: '#1c1c2a',
          600: '#262636',
          500: '#3a3a4e',
          400: '#5a5a72',
          300: '#8a8aa3',
          200: '#b8b8cc',
          100: '#e6e6f0',
        },
        // Orange accent ramp
        ember: {
          50: '#fff5ed',
          100: '#ffe7d4',
          200: '#ffc9a8',
          300: '#ffa578',
          400: '#ff7d3c',
          500: '#f9621a',
          600: '#e84a0c',
          700: '#c2390a',
          800: '#9a2f10',
          900: '#7d2a12',
        },
        // Secondary cool accent
        azure: {
          400: '#4db5e8',
          500: '#2a9fd6',
          600: '#1a7fb8',
        },
        success: '#4ade80',
        warning: '#facc15',
        error: '#f87171',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      boxShadow: {
        'ember': '0 0 40px -10px rgba(249, 98, 26, 0.45)',
        'ember-lg': '0 0 80px -15px rgba(249, 98, 26, 0.55)',
        'inset-cine': 'inset 0 0 120px 40px rgba(0,0,0,0.85)',
      },
      backgroundImage: {
        'radial-ember': 'radial-gradient(ellipse at 30% 40%, rgba(249,98,26,0.12), transparent 60%)',
        'grid-faint': 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'rise': 'rise 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        rise: { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        pulseSoft: { '0%,100%': { opacity: '0.5' }, '50%': { opacity: '1' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
    },
  },
  plugins: [],
};
