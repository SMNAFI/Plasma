import React, { useEffect, useState } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import moment from 'moment'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { db } from './../firebase'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { setUser } from '../actions/userActions'
import MyRequests from '../components/MyRequests'
import checkDonationDate from '../hooks/checkDate'
import SubHero from '../components/SubHero/SubHero'
import Required from './../components/Required'

const ProfileScreen = () => {
  const userDetails = useSelector((state) => state.userDetails)
  const { userInfo } = userDetails
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState(userInfo ? userInfo.name : '')
  const [phone, setPhone] = useState(userInfo ? userInfo.phone : '')
  const [bloodGroup, setBloodGroup] = useState(
    userInfo ? userInfo.bloodGroup : ''
  )
  const [isDonar, setIsDonar] = useState(userInfo ? userInfo.isDonar : false)
  const [status, setStatus] = useState(userInfo ? userInfo.status : '')
  const [lastDonation, setLastDonation] = useState(
    userInfo ? userInfo.lastDonation : ''
  )
  const [numDonation, setNumDonation] = useState(
    userInfo ? userInfo.numDonation : 0
  )
  const [area, setArea] = useState(userInfo ? userInfo.area : '')
  const [district, setDistrict] = useState(userInfo ? userInfo.district : '')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
    if (status === 'Want to donate') {
      setIsDonar(true)
    } else {
      setIsDonar(false)
    }
  }, [navigate, userInfo, status])

  const updateHandler = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      await setDoc(
        doc(db, 'users', userInfo.uid),
        {
          name,
          phone,
          bloodGroup,
          status,
          numDonation,
          lastDonation,
          area,
          district,
          isDonar,
        },
        { merge: true }
      )
      // getting back user data
      const res = await getDoc(doc(db, 'users', userInfo.uid))

      dispatch(setUser({ uid: userInfo.uid, ...res.data() }))

      setLoading(false)
      setSuccess(true)
    } catch (error) {
      setLoading(false)
      setError(error.message)
      console.log(error.message)
    }
  }

  return (
    <>
      <SubHero
        title={`Welcome, ${userInfo ? userInfo.name : ''}`}
        text={
          'Please complete your profile and update last donation date every time you donate blood'
        }
      />

      <Container>
        <section className='my-5 mx-auto' style={{ maxWidth: '950px' }}>
          {success && <Message>Profile updated successfully</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}

          {lastDonation && (
            <div>
              <h5>
                {checkDonationDate(lastDonation) ? (
                  <Message>
                    Your Next Donation Date was:{' '}
                    {moment(lastDonation)
                      .add(121, 'days')
                      .format('MMMM Do YYYY')}
                  </Message>
                ) : (
                  <Message>
                    Your Next Donation Date is:{' '}
                    {moment(lastDonation)
                      .add(121, 'days')
                      .format('MMMM Do YYYY')}
                  </Message>
                )}
              </h5>
            </div>
          )}

          <Form onSubmit={updateHandler}>
            <Row>
              <Col lg={6}>
                <Form.Group controlId='name' className='my-3'>
                  <Form.Label>
                    Name
                    <Required />
                  </Form.Label>
                  <Form.Control
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={true}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group controlId='phone' className='my-3'>
                  <Form.Label>
                    Phone number
                    {/* {isDonar && <Required />} */}
                    <Required />
                  </Form.Label>
                  <Form.Control
                    type='text'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    pattern='[0-9]{11}'
                    title='11 digits phone number'
                    // required={isDonar}
                    required={true}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col lg={6}>
                <Form.Group controlId='bloodGroup' className='my-3'>
                  <Form.Label>
                    Blood group
                    {isDonar && <Required />}
                  </Form.Label>
                  <Form.Select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    required={isDonar}
                  >
                    <option></option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                    <option>O+</option>
                    <option>O-</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group controlId='status' className='my-3'>
                  <Form.Label>
                    Status
                    <Required />
                  </Form.Label>
                  <Form.Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required={true}
                  >
                    <option disabled></option>
                    <option>Want to donate</option>
                    <option>Not available now</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col lg={6}>
                <Form.Group controlId='numDonation' className='my-3'>
                  <Form.Label>
                    How many times did you donate blood before?
                  </Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Number of previous dontion'
                    value={numDonation}
                    onChange={(e) => setNumDonation(Number(e.target.value))}
                    required={true}
                    min='0'
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group controlId='lastDonation' className='my-3'>
                  <Form.Label>Last donation date</Form.Label>
                  <Form.Control
                    type='date'
                    placeholder='Date'
                    value={lastDonation}
                    onChange={(e) => setLastDonation(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col lg={6}>
                <Form.Group controlId='area' className='my-3'>
                  <Form.Label>Area{isDonar && <Required />}</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Area'
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    required={isDonar}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group controlId='district' className='my-3'>
                  <Form.Label>District{isDonar && <Required />}</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='district'
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    required={isDonar}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Button type='submit' varient='primary' className='mt-3'>
              Update Profile
            </Button>
          </Form>

          <MyRequests userId={userInfo?.uid} />
        </section>
      </Container>
    </>
  )
}

export default ProfileScreen
