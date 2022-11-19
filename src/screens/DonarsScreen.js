import React from 'react'
import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import Loader from './../components/Loader'
import Message from './../components/Message'
import { Col, Row } from 'react-bootstrap'
import Donar from './../components/Donar'

function DonarsScreen() {
  const [donars, setDonars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // const unsub = onSnapshot(
    //   collection(db, 'users'),
    //   (snapShot) => {
    //     let list = []

    //     snapShot.docs.forEach((doc) => {
    //       list.push({ id: doc.id, ...doc.data() })
    //     })
    //     setDonars(list)
    //     setLoading(false)
    //     // console.log(list)
    //   },
    //   (error) => {
    //     setError(error)
    //     // console.log(error)
    //   }
    // )
    const q = query(collection(db, 'users'), where('isDonar', '==', true))
    const unsub = onSnapshot(
      q,
      (querySnapshot) => {
        const list = []
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() })
        })
        // console.log(list)
        setDonars(list)
        setLoading(false)
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
      <h1 className='my-5'>Donars</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {donars.map((donar) => (
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
