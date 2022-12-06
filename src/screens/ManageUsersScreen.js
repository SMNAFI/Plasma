import { collection, onSnapshot, query } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import SubHero from '../components/SubHero/SubHero'
import { db } from '../firebase'

const ManageUsersScreen = () => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setError(null)
    setLoading(true)

    const q = query(collection(db, 'users'))
    const unsub = onSnapshot(
      q,
      (querySnapshot) => {
        const list = []
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() })
        })

        setUsers(list)
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

  const handleDelete = () => {}

  return (
    <>
      <SubHero title='Manage Users'></SubHero>

      <Container className='my-5'>
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
        <div>
          <Table striped bordered size='sm' responsive='xl'>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map(({ id, name, email, isAdmin }) => (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>
                    {isAdmin ? (
                      <i className='fa-solid fa-check text-info'></i>
                    ) : (
                      <i className='fa-sharp fa-solid fa-xmark text-danger'></i>
                    )}
                  </td>
                  <td>
                    <i
                      className='fa-solid fa-trash-can'
                      onClick={handleDelete}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  )
}

export default ManageUsersScreen
