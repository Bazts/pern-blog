import { useContext } from 'react'
import { UserContext } from '../context/user.jsx'

export const useUser = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useUser must be within a UserProvider')
  }

  return context
}
