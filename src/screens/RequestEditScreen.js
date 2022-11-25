import React, { useEffect, useState } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { Button, Col, Form, Row } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useParams } from 'react-router-dom'

const RequestEditScreen = () => {
  const { id } = useParams()
  const [problem, setProblem] = useState('')
  const [bloodGroup, setBloodGroup] = useState('')
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const [numBag, setNumBag] = useState(1)
  const [contact, setContact] = useState('')
  const [location, setLocation] = useState('')
  const [district, setDistrict] = useState('')
  const [isManaged, setIsManaged] = useState(false)
  const [numManaged, setNumManaged] = useState(0)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setError(null)
    setLoading(true)
    const fetchData = async () => {
      try {
        const docRef = await getDoc(doc(db, 'requests', id))
        const res = docRef.data()

        setProblem(res.problem)
        setBloodGroup(res.bloodGroup)
        setTime(res.time)
        setDate(res.date)
        setNumBag(res.numBag)
        setContact(res.contact)
        setLocation(res.location)
        setDistrict(res.district)
        setIsManaged(res.isManaged)
        setNumManaged(res.numManaged)

        setLoading(false)
      } catch (error) {
        setLoading(false)
        setError(error.message)
        console.log(error)
        console.log(error.message)
      }
    }
    fetchData()
  }, [id])

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      await setDoc(
        doc(db, 'requests', id),
        {
          problem,
          bloodGroup,
          isManaged,
          date,
          time,
          numBag,
          numManaged,
          contact,
          location,
          district,
        },
        { merge: true }
      )

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
      <h1 className='text-center my-5'>Edit your request</h1>

      {success && <Message>Request updated successfully</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler} className='my-5'>
        <Form.Group controlId='isManged' className='mb-3'>
          <Form.Check
            type='switch'
            id='isManged'
            label='Mark as managed'
            checked={isManaged}
            onChange={(e) => setIsManaged(e.target.checked)}
          />
        </Form.Group>

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

          <Col md={6}>
            <Form.Group controlId='numManaged' className='mb-3'>
              <Form.Label>Number of bag that is managed</Form.Label>
              <Form.Control
                type='number'
                placeholder='Num of bages'
                value={numManaged}
                onChange={(e) => setNumManaged(e.target.value)}
                required={true}
                min='0'
              ></Form.Control>
            </Form.Group>
          </Col>

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
                placeholder='Enter District'
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required={true}
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId='time' className='mb-3'>
              <Form.Label>Time</Form.Label>
              <Form.Control
                type='text'
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

          <Col md={6}>
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
          </Col>
        </Row>

        <Button type='submit' varient='primary'>
          Update
        </Button>
      </Form>
    </>
  )
}

export default RequestEditScreen
