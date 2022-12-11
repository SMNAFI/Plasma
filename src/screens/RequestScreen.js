import React, { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import Message from './../components/Message'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { db } from './../firebase'
import Loader from './../components/Loader'
import { useSelector } from 'react-redux'
import Required from './../components/Required'
import SubHero from '../components/SubHero/SubHero'
import { useNavigate } from 'react-router-dom'

const RequestPage = () => {
  const [problem, setProblem] = useState('')
  const [bloodGroup, setBloodGroup] = useState('')
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const [numBag, setNumBag] = useState(1)
  const [contact, setContact] = useState('')
  const [location, setLocation] = useState('')
  const [district, setDistrict] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const userDetails = useSelector((state) => state.userDetails)
  const { userInfo } = userDetails

  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()

    setLoading(true)
    setSuccess(false)
    setError(null)

    try {
      await addDoc(collection(db, 'requests'), {
        uid: userInfo.uid,
        problem,
        bloodGroup,
        location,
        district,
        numBag,
        contact,
        time,
        date,
        numManaged: 0,
        isManaged: false,
        createdAt: serverTimestamp(),
      })

      setProblem('')
      setBloodGroup('A+')
      setNumBag(1)
      setContact('')
      setLocation('')
      setDistrict('')
      setTime('')
      setDate('')
      setLoading(false)
      setSuccess(true)

      navigate('/feed')
    } catch (error) {
      setLoading(false)
      setError(error.message)
      console.log(error)
    }
  }

  return (
    <>
      <SubHero
        title={'Request for blood'}
        text={'Fill up the form and submit your request'}
      />

      <Container style={{ maxWidth: '800px' }} className='my-5'>
        {success && <Message>Request posted successfully</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}

        <Form onSubmit={submitHandler} className='my-5'>
          <Form.Group controlId='problem' className='mb-3'>
            <Form.Label>
              Patient's Problem
              <Required />
            </Form.Label>
            <Form.Control
              className='shadow-none'
              as='textarea'
              placeholder="Enter patient's problem"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              required={true}
            ></Form.Control>
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group controlId='bloodGroup' className='mb-3'>
                <Form.Label>
                  Required Blood Group
                  <Required />
                </Form.Label>
                <Form.Select
                  className='shadow-none'
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  required={true}
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
            <Col md={6}>
              <Form.Group controlId='numBag' className='mb-3'>
                <Form.Label>
                  Required number of bages
                  <Required />
                </Form.Label>
                <Form.Control
                  className='shadow-none'
                  type='number'
                  placeholder='Num of bages'
                  value={numBag}
                  onChange={(e) => setNumBag(Number(e.target.value))}
                  required={true}
                  min='1'
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId='location' className='mb-3'>
                <Form.Label>
                  Location
                  <Required />
                </Form.Label>
                <Form.Control
                  className='shadow-none'
                  type='text'
                  placeholder='Enter location'
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required={true}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId='district' className='mb-3'>
                <Form.Label>
                  District
                  <Required />
                </Form.Label>
                <Form.Control
                  className='shadow-none'
                  type='text'
                  placeholder='Enter district'
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  required={true}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId='time' className='mb-3'>
                <Form.Label>
                  Time
                  <Required />
                </Form.Label>
                <Form.Control
                  className='shadow-none'
                  type='string'
                  placeholder='Time'
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required={true}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId='lastDonation' className='mb-3'>
                <Form.Label>
                  Date
                  <Required />
                </Form.Label>
                <Form.Control
                  className='shadow-none'
                  type='date'
                  placeholder='Date'
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required={true}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId='contact' className='mb-3'>
            <Form.Label>
              Contact Number
              <Required />
            </Form.Label>
            <Form.Control
              className='shadow-none'
              type='text'
              placeholder='Contact Number'
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required={true}
              pattern='[0-9]{11}'
              title='11 digits phone number'
            ></Form.Control>
          </Form.Group>

          <div className='text-center'>
            <button
              type='submit'
              className='btn-main mt-3'
              style={{ width: '100%' }}
            >
              Submit your request
            </button>
          </div>
        </Form>
      </Container>
    </>
  )
}

export default RequestPage
