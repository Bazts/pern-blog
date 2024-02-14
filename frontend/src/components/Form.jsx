import { Input, InputContainer, InputWrapper } from './Input.jsx'

import './Form.css'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../hooks/useUser.jsx'

export const Form = ({ children, onSubmit, className }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(e)
  }

  return (
    <form className={`form-sign ${className ?? ''}`}
      onSubmit={handleSubmit}>
      {children}
    </form>
  )
}

export const SignUpForm = () => {
  const handleSubmit = (e) => {
    const userData = Object.fromEntries(new window.FormData(e.target))

    fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...userData }),
      credentials: 'include'
    })
      .then(res => {
        if (!res.ok) return res.json().then(err => Promise.reject(err))

        return res.json()
      })
      .then(data => {
        console.log(data)
      })
      .then(err => console.log(err))
  }

  return (
    <Form onSubmit={handleSubmit}>
      <InputWrapper>
        <InputContainer labelTitle={'Username'}>
          <Input inputName={'username'}
            inputType={'text'} />
        </InputContainer>
      </InputWrapper>

      <InputWrapper>
        <InputContainer labelTitle={'Email'}>
          <Input inputName={'email'}
            inputType={'email'}
           />
        </InputContainer>
      </InputWrapper>

      <InputWrapper>
        <InputContainer labelTitle={'Password'}>
          <Input inputName={'password'}
            inputType={'password'}
           />
        </InputContainer>
      </InputWrapper>
      <button className='form-btn-submit'
        type="submit">Sign up</button>
    </Form>
  )
}

export const LogInForm = () => {
  const navigate = useNavigate()
  const { updateUser } = useUser()

  const handleSubmit = (e) => {
    const userData = Object.fromEntries(new window.FormData(e.target))

    fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...userData }),
      credentials: 'include'
    })
      .then(res => {
        if (!res.ok) return res.json().then(err => Promise.reject(err))

        return res.json()
      })
      .then(data => {
        navigate('/')
        updateUser(data.user)
      })
      .then(err => console.log(err))
  }

  return (
    <Form onSubmit={handleSubmit}>
      <InputWrapper>
        <InputContainer labelTitle={'Username'}>
          <Input inputName={'username'}
            inputType={'text'} />
        </InputContainer>
      </InputWrapper>

      <InputWrapper>
        <InputContainer labelTitle={'Password'}>
          <Input inputName={'password'}
            inputType={'password'}
           />
        </InputContainer>
      </InputWrapper>
      <button className='form-btn-submit'
        type="submit">Sign up</button>
    </Form>
  )
}
