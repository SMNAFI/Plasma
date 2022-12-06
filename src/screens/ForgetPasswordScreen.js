import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import Message from '../components/Message'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ForgetPasswordScreen = () => {
  const userDetails = useSelector((state) => state.userDetails)
  const { userInfo } = userDetails

  const navigate = useNavigate()

  // if user exists
  useEffect(() => {
    if (userInfo) {
      navigate(`/`)
    }
  }, [navigate, userInfo])

  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  const submitHandler = (e) => {
    e.preventDefault()

    setError(null)
    setMessage(null)

    const auth = getAuth()
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
        setMessage('Password reset email is sent!')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        // ..
        console.log(errorCode, errorMessage)
        setError("We couldn't find your email.")
      })
  }

  return (
    <div
      className='container center'
      style={{ maxWidth: '650px', minHeight: '100vh' }}
    >
      <div>
        <div className='text-center mb-5'>
          <h1>Forget Password</h1>
          <p>
            Enter your email and we will send you a link to reset your password.
          </p>
        </div>

        {message && <Message>{message}</Message>}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email' className='mb-3'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='example@gamil.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            ></Form.Control>
          </Form.Group>
          {error && <Message variant='danger'>{error}</Message>}
          <button type='submit' className='btn-main' style={{ width: '100%' }}>
            Send
          </button>
        </Form>

        <p className='text-center my-3'>
          <Link to='/login' className='text-decoration-none'>
            <i className='fa-solid fa-chevron-left'></i> Back to login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ForgetPasswordScreen
