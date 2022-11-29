import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import { Col, Container, Form, Row } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Request from '../components/Request'
import SubHero from '../components/SubHero/SubHero'

const RequestFeedScreen = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const colRef = collection(db, 'requests')
    const q = query(colRef, orderBy('createdAt', 'desc'))

    const unsub = onSnapshot(
      q,
      (snapShot) => {
        let list = []

        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() })
        })
        setRequests(list)
        setLoading(false)
      },
      (error) => {
        setError(error)
      }
    )

    return () => {
      unsub()
    }
  }, [])

  // searching by bloodGroup and area
  const [queryByGroup, setQueryByGroup] = useState('')
  const [queryByLocation, setQueryByLocation] = useState('')

  const handleSearch = (requests) => {
    if (queryByLocation && queryByGroup) {
      return requests.filter(
        (request) =>
          request.bloodGroup === queryByGroup &&
          (request.location
            .toLowerCase()
            .includes(queryByLocation.toLowerCase()) ||
            request.district
              .toLowerCase()
              .includes(queryByLocation.toLowerCase()))
      )
    }
    if (queryByGroup) {
      return requests.filter((request) => request.bloodGroup === queryByGroup)
    }
    if (queryByLocation) {
      return requests.filter(
        (request) =>
          request.location
            .toLowerCase()
            .includes(queryByLocation.toLowerCase()) ||
          request.district.toLowerCase().includes(queryByLocation.toLowerCase())
      )
    }

    return requests
  }

  return (
    <>
      <SubHero
        title={'All Requests'}
        text={'Our Realtime Network Activity Feed'}
      />

      <Container className='my-5'>
        <Row>
          <Col md={6}>
            <Form.Group controlId='name'>
              <Form.Label>Find requests by location</Form.Label>
              <Form.Control
                type='text'
                value={queryByLocation}
                onChange={(e) => setQueryByLocation(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId='group'>
              <Form.Label>Find requests by blood group</Form.Label>
              <Form.Select
                value={queryByGroup}
                onChange={(e) => setQueryByGroup(e.target.value)}
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
        </Row>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Row>
            {handleSearch(requests).map((request) => (
              <Col key={request.id} sm={12} lg={6}>
                <Request request={request} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  )
}

export default RequestFeedScreen
