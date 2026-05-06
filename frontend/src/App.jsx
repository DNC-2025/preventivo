import { Routes, Route, Navigate } from 'react-router-dom'
import { SignedIn, SignedOut } from '@clerk/clerk-react'
import LoginPage from './pages/LoginPage'
import Layout from './components/Layout'

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <>
            <SignedOut><LoginPage /></SignedOut>
            <SignedIn><Navigate to="/" replace /></SignedIn>
          </>
        }
      />
      <Route
        path="/*"
        element={
          <>
            <SignedIn><Layout /></SignedIn>
            <SignedOut><Navigate to="/login" replace /></SignedOut>
          </>
        }
      />
    </Routes>
  )
}

export default App