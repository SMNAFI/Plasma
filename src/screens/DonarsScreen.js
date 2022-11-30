import React from 'react'
import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import Loader from './../components/Loader'
import Message from './../components/Message'
import { Col, Container, Form, Row } from 'react-bootstrap'
import Donar from './../components/Donar'
import SubHero from '../components/SubHero/SubHero'
import { handleDonarFilter } from '../hooks/handleFilters'
// import checkDonationDate from './../hooks/checkDate'

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
  const [byGroup, setByGroup] = useState('All')
  const [byArea, setByArea] = useState('')
  const [byAvailable, setByAvailable] = useState('All')

  return (
    <>
      <SubHero title={'Donars'} text={'Find our Super Hero Volunteers'} />

      <Container className='my-5' style={{ maxWidth: '900px' }}>
        <Row>
          <Col lg={4}>
            <Form.Group controlId='name'>
              <Form.Label>Filter by name or area</Form.Label>
              <Form.Control
                type='text'
                value={byArea}
                onChange={(e) => setByArea(e.target.value)}
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
            <Form.Group controlId='available'>
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={byAvailable}
                onChange={(e) => setByAvailable(e.target.value)}
              >
                <option>All</option>
                <option>Ready to donate</option>
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
            {handleDonarFilter(donars, byGroup, byAvailable, byArea).map(
              (donar) => (
                <Donar donar={donar} key={donar.id} />
              )
            )}
          </Row>
        )}
      </Container>
    </>
  )
}

export default DonarsScreen
