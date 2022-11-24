import React, { useEffect, useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import Message from './../components/Message'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { db } from './../firebase'
import Loader from './../components/Loader'
import { useSelector } from 'react-redux'
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
  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
  }, [navigate, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
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
      // console.log(res)
    } catch (error) {
      setLoading(false)
      setError(error)
      console.log(error)
    }
  }

  return (
    <>
      <h1 className='text-center my-5'>Request for blood</h1>

      {success && <Message>Request posted successfully</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler} className='my-5'>
        <Form.Group controlId='problem' className='mb-3'>
          <Form.Label>Problem</Form.Label>
          <Form.Control
            as='textarea'
            placeholder='Enter your reason'
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            required={true}
          ></Form.Control>
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group controlId='bloodGroup' className='mb-3'>
              <Form.Label>Required Blood Group</Form.Label>
              <Form.Select
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
              <Form.Label>Required number of bages</Form.Label>
              <Form.Control
                type='number'
                placeholder='Num of bages'
                value={numBag}
                onChange={(e) => setNumBag(e.target.value)}
                required={true}
                min='1'
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId='location' className='mb-3'>
              <Form.Label>Location</Form.Label>
              <Form.Control
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
              <Form.Label>District</Form.Label>
              <Form.Control
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
              <Form.Label>Time</Form.Label>
              <Form.Control
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
              <Form.Label>Date</Form.Label>
              <Form.Control
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
          <Form.Label>Contact Number</Form.Label>
          <Form.Control
            type='text'
            placeholder='Contact Number'
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required={true}
            pattern='[0-9]{11}'
            title='11 digits phone number'
          ></Form.Control>
        </Form.Group>

        <Button type='submit' varient='primary'>
          Submit your request
        </Button>
      </Form>
    </>
  )
}

export default RequestPage
