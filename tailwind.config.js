/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // — Per-era accent colors (official club identities, refined) —
        'sporting-green': '#10b981',
        'sporting-green-light': '#34d399',
        'sporting-green-dark': '#059669',
        'united-red': '#ef011d',
        'united-red-light': '#f83b46',
        'united-red-dark': '#c0001d',
        'real-white': '#f5f5f5',
        'real-white-light': '#ffffff',
        'real-white-dark': '#d4d4d4',
        'juve-yellow': '#fbbf24',
        'juve-yellow-light': '#fcd34d',
        'juve-yellow-dark': '#d97706',
        'alnassr-gold': '#f7c600',
        'alnassr-gold-light': '#facc15',
        'alnassr-gold-dark': '#d97706',
        // — Editorial / neutral palette —
        'dark-bg': '#050505',
        'dark-surface': '#0d0d0d',
        'dark-elevated': '#131313',
        'dark-card': '#0a0a0a',
        'text-primary': '#fafafa',
        'text-secondary': '#c5c5c5',
        'text-tertiary': '#8a8a8a',
        'border-subtle': 'rgba(255, 255, 255, 0.04)',
        'border-weak': 'rgba(255, 255, 255, 0.08)',
        'border-strong': 'rgba(255, 255, 255, 0.15)',
      },
      fontFamily: {
        heading: ['"Inter var"', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Fira Code"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        'tighter': '-.04em',
        'tight': '-.025em',
        'wide': '0.03em',
        'wider': '0.06em',
        'widest': '0.12em',
      },
      lineHeight: {
        'ultra-tight': '1.05',
        'tight': '1.15',
        'normal': '1.45',
      },
      boxShadow: {
        'glow-sm': '0 0 20px 2px',
        'glow-md': '0 0 40px 4px',
        'glow-lg': '0 0 60px 8px',
        'inner-glow': 'inset 0 0 30px 4px',
      },
      transitionProperty: {
        'colors': 'color, background-color, border-color, text-shadow, box-shadow',
        'transform': 'transform, filter',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.6' },
        },
      },
      backgroundImage: {
        // — Era-specific gradients for headers and accents —
        'gradient-sporting': 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)',
        'gradient-united': 'linear-gradient(135deg, #c0001d 0%, #ef011d 50%, #f83b46 100%)',
        'gradient-real': 'linear-gradient(135deg, #a3a3a3 0%, #f5f5f5 50%, #ffffff 100%)',
        'gradient-juve': 'linear-gradient(135deg, #d97706 0%, #fbbf24 50%, #fcd34d 100%)',
        'gradient-alnassr': 'linear-gradient(135deg, #d97706 0%, #f7c600 50%, #facc15 100%)',
        'gradient-portugal': 'linear-gradient(135deg, #c0001d 0%, #ef011d 50%, #f83b46 100%)',
        // — Smooth dark-to-accent gradients for cards —
        'gradient-card-dark': 'linear-gradient(180deg, rgba(13,13,13,0.8) 0%, rgba(10,10,10,0.9) 100%)',
        'gradient-radial': 'radial-gradient(circle at center, rgba(15,15,15,0.9) 0%, rgba(5,5,5,1) 70%)',
      },
    },
  },
  plugins: [],
}
