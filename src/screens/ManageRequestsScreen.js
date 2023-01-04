import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { db } from '../firebase'
import SubHero from './../components/SubHero/SubHero'

const ManageRequestsScreen = () => {
  const [requests, setRequests] = useState([])
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setError(null)
    setLoading(true)

    const ref = query(collection(db, 'requests'))
    const q = query(ref, orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(
      q,
      (querySnapshot) => {
        const list = []
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() })
          console.log(doc.data())
        })

        setRequests(list)
        setLoading(false)
      },
      (error) => {
        setError(error.message)
        console.log(error.message, error)
      }
    )

    return () => {
      unsub()
    }
  }, [])

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        setLoading(true)
        setError(null)
        setMessage(null)

        await deleteDoc(doc(db, 'requests', id))

        setMessage('Request is deleted.')
      } catch (error) {
        setLoading(false)

        setError(error.message)
      }
    }
  }

  return (
    <>
      <SubHero title='Manage Requests'></SubHero>
      <Container className='my-5'>
        {loading && <Loader />}
        {message && <Message>{message}</Message>}
        {error && <Message variant='error'>{error}</Message>}

        <Table striped bordered size='sm' responsive='xl'>
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Reason</th>
              <th>Blood Group</th>
              <th>Status</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(
              ({ id, problem, bloodGroup, isManaged, createdAt }) => (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{problem}</td>
                  <td>{bloodGroup}</td>
                  <td>{isManaged ? 'Managed' : 'Not Managed'}</td>
                  <td>{moment(createdAt?.toDate()).fromNow()}</td>
                  <td>
                    <Link to={`/feed/${id}`}>
                      <i className='fa-solid fa-eye me-3'></i>
                    </Link>
                    <Link to={`/feed/${id}/edit`}>
                      <i className='fa-solid fa-pen-to-square me-3'></i>
                    </Link>
                    <span
                      style={{ cursor: 'pointer' }}
                      onClick={() => deleteHandler(id)}
                    >
                      <i className='fa-solid fa-trash-can text-danger'></i>
                    </span>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </Container>
    </>
  )
}

export default ManageRequestsScreen
