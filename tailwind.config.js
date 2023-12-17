/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        'm-night': {
          0: 'var(--mantine-color-night-0)',
          1: 'var(--mantine-color-night-1)',
          2: 'var(--mantine-color-night-2)',
          3: 'var(--mantine-color-night-3)',
          4: 'var(--mantine-color-night-4)',
          5: 'var(--mantine-color-night-5)',
          6: 'var(--mantine-color-night-6)',
          7: 'var(--mantine-color-night-7)',
          8: 'var(--mantine-color-night-8)',
          9: 'var(--mantine-color-night-9)',
          10: 'var(--mantine-color-night-10)',
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  plugins: [require('tailwindcss-animate'), require('tailwindcss-radix')()],
};
