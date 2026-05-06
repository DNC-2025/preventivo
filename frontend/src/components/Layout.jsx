import { Link, Routes, Route, useLocation } from 'react-router-dom'
import { UserButton } from '@clerk/clerk-react'
import DashboardPage from '../pages/DashboardPage'

const navItems = [
  { path: '/',          label: 'Dashboard',  icon: '▦' },
  { path: '/preventivi', label: 'Preventivi', icon: '📄' },
  { path: '/clienti',   label: 'Clienti',    icon: '👥' },
  { path: '/catalogo',  label: 'Catalogo',   icon: '📦' },
  { path: '/azienda',   label: 'Azienda',    icon: '⚙️' },
]

function Layout() {
  const location = useLocation()

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'var(--sidebar-width) 1fr', minHeight: '100vh' }}>
      
      {/* Sidebar */}
      <aside style={{
        background: '#fff',
        borderRight: '0.5px solid #e8e8e8',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        width: 'var(--sidebar-width)',
        height: '100vh',
        zIndex: 10,
      }}>
        {/* Logo */}
        <div style={{ padding: '1rem', borderBottom: '0.5px solid #e8e8e8', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '28px', height: '28px', background: '#185FA5', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
          </div>
          <span style={{ fontSize: '15px', fontWeight: '500' }}>Preventivi</span>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '0.5rem 0' }}>
          {navItems.map(item => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 1rem',
                  fontSize: '13px',
                  color: isActive ? '#185FA5' : '#666',
                  fontWeight: isActive ? '500' : '400',
                  background: isActive ? '#E6F1FB' : 'transparent',
                  borderRight: isActive ? '2px solid #185FA5' : '2px solid transparent',
                  transition: 'all 0.1s',
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* User bottom */}
        <div style={{ padding: '1rem', borderTop: '0.5px solid #e8e8e8', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UserButton afterSignOutUrl="/login" />
          <span style={{ fontSize: '12px', color: '#888' }}>Account</span>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ marginLeft: 'var(--sidebar-width)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Page content */}
        <div style={{ flex: 1, padding: '1.5rem' }}>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
          </Routes>
        </div>
      </main>

    </div>
  )
}

export default Layout