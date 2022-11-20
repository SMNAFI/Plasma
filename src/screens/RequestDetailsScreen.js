import React, { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Button, Card } from 'react-bootstrap'

function RequestDetailsScreen() {
  const { id } = useParams()
  const [requestInfo, setRequestInfo] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const {
    problem,
    bloodGroup,
    time,
    date,
    numBag,
    contact,
    location,
    numManaged,
    response,
    isManaged,
  } = requestInfo

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, 'requests', id),
      (doc) => {
        //   console.log('Current data: ', doc.data())
        setLoading(false)
        setRequestInfo({ id: doc.id, ...doc.data() })
        // console.log(doc.data().response.length)
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
    <div className='mx-auto' style={{ maxWidth: '650px' }}>
      <h1 className='my-5 text-center'>Request Details</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          {isManaged ? (
            <Message>Blood managed succefully</Message>
          ) : (
            <Message variant='danger'>Blood yet not managed</Message>
          )}
          <Card className='my-3 p-3 rounded'>
            <Card.Body>
              <Card.Text>Problem: {problem}</Card.Text>
              <Card.Text>Blood Group: {bloodGroup}</Card.Text>
              <Card.Text>Time: {time}</Card.Text>
              <Card.Text>Date: {date}</Card.Text>
              <Card.Text>Number of bages: {numBag}</Card.Text>
              <Card.Text>Contuct Number: {contact}</Card.Text>
              <Card.Text>Location: {location}</Card.Text>
              <Card.Text>Bag managed: {numManaged}</Card.Text>
              <Card.Text>Total response: {response.length}</Card.Text>
            </Card.Body>
            <Button>Response to the request</Button>
          </Card>
        </>
      )}
    </div>
  )
}

export default RequestDetailsScreen
