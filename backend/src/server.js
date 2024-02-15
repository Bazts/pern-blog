import express from 'express'
import cors from 'cors'

import authRoutes from './routes/authRoutes.js'
import { pool } from './db/index.js'
import path from 'path'

const app = express()
const port = 3000

const __dirname = path.resolve()
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(express.static(path.join(__dirname, '/frontend/dist')))
// app.get('*', async (req, res, next) => {
//   next(
//     res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
//   )
// })

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('*', async (req, res) => {
  try {
    const getAllUsersQuery = `
    SELECT * FROM users
  `

    const response = await pool.query(getAllUsersQuery)
    const users = response.rows

    console.log(users)

    res.status(200).json({ users })
  } catch (error) {
    console.log(error)
  }
})

app.use('/api/auth', authRoutes)

app.use((err, req, res, next) => {
  console.log(err)
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'
  const details = err.details || null

  res.status(statusCode).json({
    success: false,
    message,
    details
  })
})

app.listen(port, () => console.log(`Server running on http://localhost:${port}`))
