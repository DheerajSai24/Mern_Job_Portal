import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './clerk-styles.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AppcontextProvider } from './context/appContext.jsx'
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

console.log('Clerk Publishable Key:', PUBLISHABLE_KEY)

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const clerkAppearance = {
  elements: {
    formButtonPrimary: 
      "bg-blue-600 hover:bg-blue-700 text-sm normal-case",
    card: "bg-white shadow-xl border border-gray-200",
    headerTitle: "text-2xl font-bold text-gray-900",
    headerSubtitle: "text-gray-600",
    socialButtonsBlockButton: 
      "bg-white border-gray-300 hover:bg-gray-50 text-gray-700",
    socialButtonsBlockButtonText: "font-semibold",
    formFieldLabel: "text-gray-700 font-medium",
    formFieldInput: 
      "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
    footerActionLink: "text-blue-600 hover:text-blue-700",
  },
  variables: {
    colorPrimary: "#2563eb",
    colorBackground: "#ffffff",
    colorText: "#1f2937",
    colorTextSecondary: "#6b7280",
    colorSuccess: "#10b981",
    colorDanger: "#ef4444",
    colorWarning: "#f59e0b",
    borderRadius: "0.5rem",
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY} 
      afterSignOutUrl="/"
      appearance={clerkAppearance}
    >
      <BrowserRouter>
        <AppcontextProvider>
          <App />
        </AppcontextProvider>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
)
