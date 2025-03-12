import type { Config } from 'tailwindcss'
import { DEFAULT_CIPHERS } from 'tls'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#FF385C',
      },
      borderColor: {
        DEFAULT: '#DDDDDD',
      },
    },
  },
  plugins: [require('daisyui')],
} satisfies Config
