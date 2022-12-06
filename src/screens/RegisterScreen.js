import React, { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, provider } from '../firebase'
import { Link, useNavigate } from 'react-router-dom'
import Message from './../components/Message'
import { Col, Container, Form, Row } from 'react-bootstrap'
import Loader from '../components/Loader'
import { db } from './../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './../actions/userActions'
import google from '../assets/images/google.svg'
import SubHero from '../components/SubHero/SubHero'

const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
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

    if (password !== confirmPassword) {
      setError('Password do not match')
    } else {
      setLoading(true)
      setError(null)

      try {
        // register user
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )
        const { user } = userCredential

        // storing user into firestore
        await setDoc(doc(db, 'users', user.uid), {
          name,
          email: user.email,
          photoURL: '',
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
            photoURL: '',
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
        setError(error.message)
        console.error(error.message)
      }
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
    <>
      <SubHero
        title='Sign Up'
        text="Join our wonderful community and start saving lives. You can become someone's unknown but all important Hero."
      />

      <Container style={{ maxWidth: '650px' }}>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}

        <Form onSubmit={submitHandler} className='mt-5'>
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
              placeholder='example@gamil.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password' className='mb-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              // placeholder='••••••'
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

          <button type='submit' className='btn-main' style={{ width: '100%' }}>
            Register
          </button>

          <Row className='py-3'>
            <Col>
              Have an account?{' '}
              <Link to='/login' style={{ textDecoration: 'none' }}>
                Login
              </Link>
            </Col>
          </Row>
        </Form>

        <div className='text-center my-5'>
          <button className='btn-google' onClick={googleSignIn}>
            <img
              src={google}
              alt='google logo'
              className='me-1'
              style={{ height: '24px' }}
            />{' '}
            Continue with google
          </button>
        </div>
      </Container>
    </>
  )
}

export default RegisterScreen
