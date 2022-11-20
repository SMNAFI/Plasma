import React, { useEffect, useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import FormContainer from './../components/FormContainer'
import Message from '../components/Message'
import Loader from './../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './../actions/userActions'
import { doc, getDoc } from 'firebase/firestore'
import { db } from './../firebase'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const userDetails = useSelector((state) => state.userDetails)
  const { userInfo } = userDetails

  // if user exists
  useEffect(() => {
    if (userInfo) {
      navigate(`/`)
    }
  }, [navigate, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault()

    setLoading(true)
    setMessage(null)
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      const { user } = userCredential

      const res = await getDoc(doc(db, 'users', user.uid))
      // console.log(res.id, res.data())

      dispatch(setUser({ uid: user.uid, ...res.data() }))
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setMessage(error.message)
      console.error(error.message)
    }
  }

  return (
    <FormContainer>
      <h1 className='text-center my-5'>Sign In</h1>

      {message && <Message variant='danger'>{message}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler} className='my-5'>
        <Form.Group controlId='email' className='mb-3'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password' className='mb-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' varient='primary'>
          Sign In
        </Button>

        <Row className='py-3'>
          <Col>
            New User?{' '}
            <Link to={'/register'} style={{ textDecoration: 'none' }}>
              Register
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  )
}

export default LoginScreen
