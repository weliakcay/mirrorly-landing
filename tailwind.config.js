/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Mirrorly brand renkleri (operations/brand/brand-guide.md)
        mirrorly: {
          cream: '#F5EFE3',   // Ana zemin
          paper: '#EBE3D2',   // Vurgu yuzey, kart bg
          gold: '#C9A961',    // CTA, link, marka kimligi
          stone: '#6B6359',   // Body text
          black: '#1F1B16',   // Baslik, koyu CTA
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
