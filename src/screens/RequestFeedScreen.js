import React, { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { Col, Form, Row } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Request from '../components/Request'

const RequestFeedScreen = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'requests'),
      (snapShot) => {
        let list = []

        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() })
        })
        setRequests(list)
        setLoading(false)
        // console.log(list)
      },
      (error) => {
        setError(error)
        // console.log(error)
      }
    )

    return () => {
      unsub()
    }
  }, [])

  // searching by bloodGroup and area
  const [queryByGroup, setQueryByGroup] = useState('')
  const [queryByArea, setQueryByArea] = useState('')

  const handleSearch = (requests) => {
    if (queryByArea && queryByGroup) {
      return requests.filter(
        (request) =>
          request.bloodGroup === queryByGroup &&
          (request.area.toLowerCase().includes(queryByArea.toLowerCase()) ||
            request.district.toLowerCase().includes(queryByArea.toLowerCase()))
      )
    }
    if (queryByGroup) {
      return requests.filter((request) => request.bloodGroup === queryByGroup)
    }
    if (queryByArea) {
      return requests.filter(
        (request) =>
          request.area.toLowerCase().includes(queryByArea.toLowerCase()) ||
          request.district.toLowerCase().includes(queryByArea.toLowerCase())
      )
    }
    return requests
  }

  return (
    <>
      <h1 className='my-5'>All Requests</h1>

      <Row>
        <Col md={6}>
          <Form.Group controlId='name'>
            <Form.Label>Find donars by area</Form.Label>
            <Form.Control
              type='text'
              value={queryByArea}
              onChange={(e) => setQueryByArea(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId='group'>
            <Form.Label>Find donars by blood group</Form.Label>
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
    </>
  )
}

export default RequestFeedScreen
