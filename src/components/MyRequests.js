import React, { useEffect, useState } from 'react'
import { collection, query, orderBy, where, getDocs } from 'firebase/firestore'
import { db } from './../firebase'
import moment from 'moment'
import Loader from './Loader'
import Message from './Message'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const MyRequests = ({ userId }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [requests, setRequests] = useState([])

  useEffect(() => {
    setError(null)
    setLoading(true)

    const fetchRequest = async () => {
      try {
        const ref = collection(db, 'requests')
        const q = query(
          ref,
          where('uid', '==', userId),
          orderBy('createdAt', 'desc')
        )

        const querySnapshot = await getDocs(q)
        let res = []
        querySnapshot.forEach((doc) => {
          res.push({ id: doc.id, ...doc.data() })
        })

        setRequests(res)
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)

        console.log(error.code, error.message)
      }
    }

    fetchRequest()
  }, [userId])
  return (
    <section className='my-5'>
      <h1 className='text-center my-5'>My requests</h1>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      {requests.length ? (
        <Table striped bordered size='sm' responsive='xl'>
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Reason</th>
              <th>Blood Group</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(({ id, problem, bloodGroup, createdAt }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{problem}</td>
                <td>{bloodGroup}</td>
                <td>{moment(createdAt?.toDate()).fromNow()}</td>
                <td>
                  <Link to={`/feed/${id}`}>
                    <i
                      className='fa-solid fa-eye me-3'
                      style={{ fontSize: '24px' }}
                    ></i>
                  </Link>
                  <Link to={`/feed/${id}/edit`}>
                    <i
                      className='fa-solid fa-pen-to-square'
                      style={{ fontSize: '24px' }}
                    ></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Message>You haven't made any request yet</Message>
      )}
    </section>
  )
}

export default MyRequests
