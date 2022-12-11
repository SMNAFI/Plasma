import React, { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Card, Col, Container, Row } from 'react-bootstrap'
import checkDonationDate from './../hooks/checkDate'
import user from '../assets/images/user.png'
import SubHero from './../components/SubHero/SubHero'

function DonarProfileScreen() {
  const { id } = useParams()
  const [donarInfo, setDonarInfo] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const {
    name,
    phone,
    bloodGroup,
    area,
    district,
    numDonation,
    lastDonation,
    // photoURL,
  } = donarInfo

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, 'users', id),
      (doc) => {
        setLoading(false)
        setDonarInfo({ id: doc.id, ...doc.data() })
      },
      (error) => {
        console.log(error)
        setError('Something went wrong!')
      }
    )

    return () => {
      unsub()
    }
  }, [id])

  return (
    <>
      <SubHero title={'Donar Details'} text={`Donar Id: ${id}`} />
      <Container className='my-5'>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <div style={{ maxWidth: '800px' }} className='mx-auto'>
            {lastDonation ? (
              checkDonationDate(lastDonation) ? (
                <Message>Ready to donate</Message>
              ) : (
                <Message variant='danger'>Not ready to donate now</Message>
              )
            ) : (
              <Message>Ready to donate</Message>
            )}

            <Card className='my-3 p-3 rounded mx-auto'>
              <Card.Body>
                <Row className='align-items-center justify-content-center'>
                  <Col sm={4} className='center'>
                    <Card.Img
                      // src={photoURL ? `${photoURL}` : user}
                      className='p-3'
                      src={user}
                      alt='user profile photo'
                      style={{ maxWidth: '200px' }}
                    />
                  </Col>

                  <Col sm={8}>
                    <Card.Title className='my-4' as='h3'>
                      {name}
                    </Card.Title>
                    <Card.Text>Blood Group: {bloodGroup}</Card.Text>
                    <Card.Text>Phone Number: {phone}</Card.Text>
                    <Card.Text>
                      Address: {area}, {district}
                    </Card.Text>
                    <Card.Text>Total Donation: {numDonation}</Card.Text>
                    {lastDonation && (
                      <Card.Text>Last Donation: {lastDonation}</Card.Text>
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        )}
      </Container>
    </>
  )
}

export default DonarProfileScreen
