import { Route, Routes, useNavigate } from 'react-router-dom'
import { Register } from './pages/Register/index.jsx'
import { Home } from './pages/Home/index.jsx'
import { useEffect } from 'react'
import { Login } from './pages/Login/index.jsx'
import { useUser } from './hooks/useUser.jsx'

export const Router = () => {
  const { updateUser, user } = useUser()
  const navigate = useNavigate()
  useEffect(() => {
    const allCookies = document.cookie
      .split('; ')

    if (allCookies.some(cookie => cookie.trim() !== '')) {
      const cookies = {}

      allCookies.forEach(cookie => {
        const key = cookie.split('=')[0]
        const value = cookie.split('=')[1]

        const decodedValue = decodeURIComponent(value)
        const parsedValue = decodedValue.includes('j:')
          ? JSON.parse(decodedValue.replace(/^j:/, ''))
          : decodedValue

        cookies[key] = parsedValue
      })

      updateUser(cookies.user_data)
      navigate('/')
    }
  }, [])

  return (
    <Routes>
      <Route path='/'
        element={<Home />} />
      <Route path='/signup'
        element={<Register />} />
      <Route path='/login'
        element={<Login />} />
      <Route path='/'
        element={<h1>Home</h1>} />
    </Routes>
  )
}
