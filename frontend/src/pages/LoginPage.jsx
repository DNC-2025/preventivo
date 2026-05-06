import { SignIn } from '@clerk/clerk-react'

const clerkAppearance = {
  elements: {
    card: {
      width: '380px',
      borderRadius: '16px',
      border: '0.5px solid #e0e0e0',
      boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      padding: '2rem 2rem 1rem',
    },
    formButtonPrimary: {
      backgroundColor: '#185FA5',
      fontSize: '13px',
      fontWeight: '500',
      borderRadius: '8px',
    },
    formFieldInput: {
      fontSize: '13px',
      borderRadius: '8px',
      border: '0.5px solid #d0d0d0',
    },
    footer: {
      display: 'none',
    },
    footerPages: {
      display: 'none',
    },
    footerPagesLink: {
      display: 'none',
    },
    logoImage: {
      display: 'none',
    },
  },
  variables: {
    colorPrimary: '#185FA5',
    colorText: '#1a1a1a',
    colorTextSecondary: '#888888',
    colorBackground: '#ffffff',
    colorInputBackground: '#ffffff',
    borderRadius: '8px',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontSize: '14px',
  },
}

function LoginPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f5f3',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
    }}>
      {/* Logo sopra il card */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '1.5rem',
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          background: '#185FA5',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
        </div>
        <span style={{ fontSize: '20px', fontWeight: '500', color: '#1a1a1a' }}>
          Preventivi
        </span>
      </div>

      <SignIn
        appearance={clerkAppearance}
        redirectUrl="/"
        signUpUrl={null}
      />

      <p style={{
        marginTop: '1rem',
        fontSize: '11px',
        color: '#bbb',
      }}>
        Accesso riservato agli utenti autorizzati
      </p>
    </div>
  )
}

export default LoginPage