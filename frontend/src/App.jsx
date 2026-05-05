import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

function App() {
  return (
    <main>
      <h1>Preventivo</h1>
      <SignedOut>
        <p>Non sei loggato</p>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <p>Sei loggato!</p>
        <UserButton />
      </SignedIn>
    </main>
  )
}

export default App