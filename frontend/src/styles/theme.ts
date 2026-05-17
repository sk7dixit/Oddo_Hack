export const theme = {
  colors: {
    primary: '#00D1FF', // Cyan
    secondary: '#8B5CF6', // Violet
    accent: '#22C55E', // Emerald
    background: '#050816', // Deep Navy
    card: 'rgba(15, 20, 40, 0.75)',
    border: 'rgba(255, 255, 255, 0.08)',
    text: {
      primary: '#FFFFFF',
      secondary: '#94A3B8', // Slate 400
      dim: '#64748B' // Slate 500
    }
  },
  // Optimized for scroll performance: removed backdrop-blur
  glass: 'bg-white/5 border border-white/10 shadow-lg',
  animations: {
    page: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    },
    hover: {
      scale: 1.01,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.99
    }
  }
};
