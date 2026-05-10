import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router'
import { ClerkProvider } from '@clerk/clerk-react'
import { dark } from '@clerk/themes'
import './index.css'
import App from './App.tsx'
import LoginPage from './pages/auth/LoginPage.tsx'
import SignupPage from './pages/auth/SignupPage.tsx'
import HeroDemoPage from './pages/HeroDemoPage.tsx'
import { useSyncUser } from './services/authService'


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

function SyncManager() {
  useSyncUser()
  return null
}

function RootLayout() {
  const navigate = useNavigate()

  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        elements: {
          watermark: { display: 'none', opacity: 0 },
          cardBox: {
            background: 'rgba(0, 0, 0, 0.4)', // True dark frosted glass
            backdropFilter: 'blur(24px) saturate(150%)',
            WebkitBackdropFilter: 'blur(24px) saturate(150%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
          },
          card: {
            background: 'transparent',
          }
        },
        variables: {
          colorPrimary: '#c084fc',
          colorBackground: '#16171d',
          colorText: '#ffffff',
          colorTextSecondary: '#d1d5db',
          colorInputBackground: 'rgba(0, 0, 0, 0.3)',
          colorInputText: '#ffffff',
        }
      }}
      publishableKey={PUBLISHABLE_KEY}
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      signInUrl="/login"
      signUpUrl="/signup"
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/"
    >
      <SyncManager />
      <Routes>
        <Route path="/" element={<HeroDemoPage />} />
        <Route path="/old-home" element={<App />} />
        {/* Must be splat routes to handle nested paths like /login/factor-one */}

        <Route path="/login/*" element={<LoginPage />} />
        <Route path="/signup/*" element={<SignupPage />} />
      </Routes>
    </ClerkProvider>
  )
}

const rootElement = document.getElementById('root')!

if (!PUBLISHABLE_KEY || PUBLISHABLE_KEY === "your_clerk_publishable_key") {
  createRoot(rootElement).render(
    <div style={{ padding: "3rem", color: "white", textAlign: "center", fontFamily: "sans-serif" }}>
      <h1>⚠️ Clerk Setup Required</h1>
      <p>Your screen is black because the Clerk Publishable Key is invalid or missing.</p>
      <p>Please add your valid <code>VITE_CLERK_PUBLISHABLE_KEY</code> to the <code>frontend/.env</code> file.</p>
    </div>
  )
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <RootLayout />
      </BrowserRouter>
    </StrictMode>,
  )
}
