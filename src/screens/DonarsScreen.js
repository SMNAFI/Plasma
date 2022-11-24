import React from 'react'
import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import Loader from './../components/Loader'
import Message from './../components/Message'
import { Col, Form, Row } from 'react-bootstrap'
import Donar from './../components/Donar'

function DonarsScreen() {
  const [donars, setDonars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const q = query(collection(db, 'users'), where('isDonar', '==', true))
    const unsub = onSnapshot(
      q,
      (querySnapshot) => {
        const list = []
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() })
        })

        setDonars(list)
        setLoading(false)
      },
      (error) => {
        setError(error)
        console.log(error.message)
      }
    )

    return () => {
      unsub()
    }
  }, [])

  // searching by bloodGroup and area
  const [queryByGroup, setQueryByGroup] = useState('')
  const [queryByArea, setQueryByArea] = useState('')

  const handleSearch = (donars) => {
    if (queryByArea && queryByGroup) {
      return donars.filter(
        (donar) =>
          donar.bloodGroup === queryByGroup &&
          (donar.area.toLowerCase().includes(queryByArea.toLowerCase()) ||
            donar.district.toLowerCase().includes(queryByArea.toLowerCase()))
      )
    }
    if (queryByGroup) {
      return donars.filter((donar) => donar.bloodGroup === queryByGroup)
    }
    if (queryByArea) {
      return donars.filter(
        (donar) =>
          donar.area.toLowerCase().includes(queryByArea.toLowerCase()) ||
          donar.district.toLowerCase().includes(queryByArea.toLowerCase())
      )
    }
    return donars
  }

  return (
    <>
      <h1 className='my-5'>Donars</h1>
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
          {handleSearch(donars).map((donar) => (
            <Col key={donar.id} sm={12} lg={6}>
              <Donar donar={donar} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default DonarsScreen
