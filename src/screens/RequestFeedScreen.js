import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import { Col, Container, Form, Row } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Request from '../components/Request'
import SubHero from '../components/SubHero/SubHero'
import { handleRequestFilter } from '../hooks/handleFilters'

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
  const [byGroup, setByGroup] = useState('All')
  const [byLocation, setByLocation] = useState('')
  const [byIsManaged, setByIsManaged] = useState('All')

  return (
    <>
      <SubHero
        title={'All Requests'}
        text={'Our Realtime Network Activity Feed'}
      />

      <Container className='my-5' style={{ maxWidth: '900px' }}>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Row>
              <Col lg={4}>
                <Form.Group controlId='name'>
                  <Form.Label>Filter by location</Form.Label>
                  <Form.Control
                    type='text'
                    value={byLocation}
                    onChange={(e) => setByLocation(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col lg={4}>
                <Form.Group controlId='group'>
                  <Form.Label>Blood Group</Form.Label>
                  <Form.Select
                    value={byGroup}
                    onChange={(e) => setByGroup(e.target.value)}
                  >
                    <option>All</option>
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

              <Col lg={4}>
                <Form.Group controlId='managed'>
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={byIsManaged}
                    onChange={(e) => setByIsManaged(e.target.value)}
                  >
                    <option>All</option>
                    <option>Not managed</option>
                    <option>Managed</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <div>
              {handleRequestFilter(
                requests,
                byGroup,
                byLocation,
                byIsManaged
              ).map((request) => (
                <Request request={request} key={request.id} />
              ))}
            </div>
          </>
        )}
      </Container>
    </>
  )
}

export default RequestFeedScreen
