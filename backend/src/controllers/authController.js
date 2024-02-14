import { pool } from '../db/index.js'
import { ErrorHandler } from '../utils/errorHandler.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const register = async (req, res, next) => {
  const { username, email, password } = req.body

  try {
    const existingUserQuery = `
      SELECT * FROM users
      WHERE email = $1
    `
    const existingUserResponse = await pool.query(existingUserQuery, [email])
    const existingUser = existingUserResponse.rows[0]
    if (existingUser) {
      return next(new ErrorHandler(400, 'User with this email already exist'))
    }

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const insertUserQuery = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING *
    `
    const insertUserResponse = await pool.query(insertUserQuery, [username, email, hashedPassword])
    const newUser = insertUserResponse.rows[0]

    res.status(201).json({ message: 'User successfully created', user: newUser })
  } catch (error) {
    return next(new ErrorHandler(500, 'Internal Server Error'))
  }
}

export const login = async (req, res, next) => {
  const { username, password } = req.body

  try {
    const existingUserQuery = `
    SELECT * FROM users
    WHERE username = $1
  `

    const existingUserResponse = await pool.query(existingUserQuery, [username])
    const existingUser = existingUserResponse.rows[0]

    if (!existingUser) {
      return next(new ErrorHandler(400, 'Invalid Credentials'))
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password)

    if (!passwordMatch) {
      return next(new ErrorHandler(400, 'Invalid Credentials'))
    }

    const { password: hashedPassword, ...rest } = existingUser
    const token = jwt.sign({ id: rest.id }, '12345', { expiresIn: '7d' })

    // const oneMinute = 60 * 60 * 1000 // 1 minute in milliseconds
    const oneWeek = 7 * 24 * 60 * 60 * 1000 // 1 week in milliseconds
    const expirationTime = new Date(Date.now() + oneWeek)

    res.cookie('user_data', rest, {
      expires: expirationTime,
      httpOnly: false
    })
    res.cookie('token', token, {
      expires: expirationTime,
      httpOnly: false
    })

    res.status(200).json({
      success: false,
      message: 'Login Successful',
      user: rest
    })
  } catch (error) {
    next(new ErrorHandler())
  }
}

export const logout = (req, res) => {
  res.clearCookie('user_data')
  res.clearCookie('token')

  res.status(200).json({ success: true, message: 'Logout successful' })
}
