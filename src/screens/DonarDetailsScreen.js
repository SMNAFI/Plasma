import React, { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Card } from 'react-bootstrap'

function DonarProfileScreen() {
  const { id } = useParams()
  const [donarInfo, setDonarInfo] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const {
    name,
    phone,
    bloodGroup,
    address,
    district,
    division,
    response,
    numDonation,
  } = donarInfo

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, 'users', id),
      (doc) => {
        //   console.log('Current data: ', doc.data())
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
      <h1 className='my-5 text-center'>Donar Details</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Card
          className='my-3 p-3 rounded mx-auto'
          style={{ maxWidth: '650px' }}
        >
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>Blood Group: {bloodGroup}</Card.Text>
            <Card.Text>Total Response: {response}</Card.Text>
            <Card.Text>Total Donation: {numDonation}</Card.Text>
            <Card.Text>Phone Number: {phone}</Card.Text>
            <Card.Text>
              Address: {address}, {district}, {division}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  )
}

export default DonarProfileScreen
