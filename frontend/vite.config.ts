import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
import path from "path"
>>>>>>> origin/auth-feature
=======
>>>>>>> origin/budget-feature

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
<<<<<<< HEAD
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
=======
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

>>>>>>> origin/auth-feature
=======
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
>>>>>>> origin/admin-feature
=======
})
>>>>>>> origin/budget-feature
