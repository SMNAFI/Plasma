import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { db } from '../firebase'
import SubHero from './../components/SubHero/SubHero'

const ManageRequestsScreen = () => {
  const [requests, setRequests] = useState([])
  const [error, setError] = useState(null)
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

  return (
    <>
      <SubHero title='Manage Requests'></SubHero>
      <Container className='my-5'>
        {loading && <Loader />}
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
                    <i className='fa-solid fa-eye me-3'></i>
                    <i className='fa-solid fa-pen-to-square me-3'></i>
                    <i className='fa-solid fa-trash-can'></i>
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
