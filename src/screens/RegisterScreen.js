import React, { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth } from '../firebase'
import { Link, useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import Message from './../components/Message'
import { Button, Col, Form, Row } from 'react-bootstrap'
import Loader from '../components/Loader'
import { db } from './../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './../actions/userActions'

const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
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

    if (password !== confirmPassword) {
      setMessage('Password do not match')
    } else {
      setLoading(true)
      setMessage(null)

      try {
        // register user
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )
        const { user } = userCredential
        // console.log(user)

        // storing user into firestore
        await setDoc(doc(db, 'users', user.uid), {
          name,
          email: user.email,
          phone: '',
          bloodGroup: '',
          status: '',
          isDonar: false,
          isAdmin: false,
          numDonation: 0,
          area: '',
          district: '',
          lastDonation: '',
          response: 0,
          timeStamp: serverTimestamp(),
        })

        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            name,
            phone: '',
            bloodGroup: '',
            status: '',
            isDonar: false,
            isAdmin: false,
            numDonation: 0,
            area: '',
            district: '',
            lastDonation: '',
            response: 0,
          })
        )

        setLoading(false)
      } catch (error) {
        setLoading(false)
        setMessage(error.message)
        console.error(error.message)
      }
    }
  }

  return (
    <FormContainer>
      <h1 className='text-center my-5'>Sign Up</h1>

      {message && <Message variant='danger'>{message}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler} className='my-5'>
        <Form.Group controlId='name' className='mb-3'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={true}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email' className='mb-3'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter your email address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
            // pattern='[0-9]{11}'
            // title='11 digits phone number'
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password' className='mb-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            // placeholder='••••••••'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
            minLength={6}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword' className='mb-3'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirem your password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required={true}
            minLength={6}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' varient='primary'>
          Register
        </Button>

        <Row className='py-3'>
          <Col>
            Have an account?{' '}
            <Link to='/login' style={{ textDecoration: 'none' }}>
              Login
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  )
}

export default RegisterScreen
