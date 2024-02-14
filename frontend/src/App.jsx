import { BrowserRouter, Link } from 'react-router-dom'
import { Router } from './router.jsx'
import { UserProvider } from './context/user.jsx'
import { MainHeader } from './components/MainHeader.jsx'

export const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <MainHeader />
        <Router />
      </BrowserRouter>
    </UserProvider>
  )
}
