import { useEffect, useState } from 'react'
import { useUser } from '../../hooks/useUser.jsx'

export const Home = () => {
  const { user } = useUser()
  const [allUsers, setAllUsers] = useState(null)

  useEffect(() => {
    fetch('/get-users')
      .then(res => {
        if (!res.ok) return res.json().then(err => Promise.reject(err))

        return res.json()
      })
      .then(data => {
        console.log(data)
        setAllUsers(data.users)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <h2>
        {!user
          ? 'No user logged'
          : `Welcome ${user.username}!`
        }
      </h2>
      <section>
        <h2>User List</h2>
        <ul>
          {allUsers?.map((user) => {
            return (
              <li key={user.id}>
                {user.username}
              </li>
            )
          })}
        </ul>
      </section>
    </>
  )
}
