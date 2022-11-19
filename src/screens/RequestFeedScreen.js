import React, { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { Col, Row } from 'react-bootstrap'
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

  return (
    <>
      <h1 className='my-5'>All Requests</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {requests.map((request) => (
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
