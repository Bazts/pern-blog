import { Link, useNavigate } from 'react-router-dom'

import './MainHeader.css'
import { useUser } from '../hooks/useUser.jsx'

export const MainHeader = () => {
  const { user, updateUser } = useUser()
  const navigate = useNavigate()

  const handleClick = () => {
    fetch('http://localhost:3000/api/auth/logout', {
      method: 'POST'
    })
    updateUser(null)
    navigate('/')
  }

  return (
    <header className='main-header'>
      <div className='main-header-content'>
        <nav className='main-header-nav'>
          <Link to={'/'}>Home</Link>
          {!user
            ? (
              <>
                <Link to={'/login'}>Log in</Link>
                <Link to={'/signup'}>Sign up</Link>
              </>)
            : <button onClick={handleClick}>Sign out</button>}
        </nav>
      </div>
    </header>
  )
}
