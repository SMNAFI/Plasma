import React, { useEffect, useState } from 'react'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../firebase'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import FormContainer from './../components/FormContainer'
import Message from '../components/Message'
import Loader from './../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './../actions/userActions'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from './../firebase'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
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
    setError(null)

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      const { user } = userCredential

      const res = await getDoc(doc(db, 'users', user.uid))

      dispatch(setUser({ uid: user.uid, ...res.data() }))
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(error.message)
      console.error(error.message)
    }
  }

  const googleSignIn = async () => {
    try {
      setError(null)
      const data = await signInWithPopup(auth, provider)
      const { user } = data
      const { uid, displayName, email, photoURL } = user

      setLoading(true)

      // fetching user from the database
      let res = await getDoc(doc(db, 'users', uid))

      // user not in the database. Means register new user
      if (!res.data()) {
        // storing user into firestore
        await setDoc(doc(db, 'users', uid), {
          name: displayName,
          email,
          photoURL,
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
          createdAt: serverTimestamp(),
        })

        // now userInfo is in the database
        res = await getDoc(doc(db, 'users', uid))
      }

      dispatch(setUser({ uid, ...res.data() }))
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(error.message)
      console.log(error.code, error.message)
    }
  }

  return (
    <FormContainer>
      <h1 className='text-center my-5'>Sign In</h1>

      {error && <Message variant='danger'>{error}</Message>}
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

      <div className='text-center my-5'>
        <button className='btn-google' onClick={googleSignIn}>
          <i className='fa-brands fa-google'></i> Sign in with google
        </button>
      </div>
    </FormContainer>
  )
}

export default LoginScreen
