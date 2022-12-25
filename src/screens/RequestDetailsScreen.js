import React, { useEffect, useState } from 'react'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Button, Card, Col, Container, Row, Accordion } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ap from '../assets/images/a+.svg'
import bp from '../assets/images/b+.svg'
import op from '../assets/images/o+.svg'
import abp from '../assets/images/ab+.svg'
import an from '../assets/images/a-.svg'
import bn from '../assets/images/b-.svg'
import on from '../assets/images/o-.svg'
import abn from '../assets/images/ab-.svg'
import SubHero from './../components/SubHero/SubHero'

function RequestDetailsScreen() {
  const { id } = useParams()
  const [requestInfo, setRequestInfo] = useState({})
  const [requestUserInfo, setRequestUserInfo] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const userDetails = useSelector((state) => state.userDetails)
  const { userInfo } = userDetails

  const {
    problem,
    bloodGroup,
    time,
    date,
    numBag,
    contact,
    location,
    district,
    numManaged,
    isManaged,
    createdAt,
    uid,
  } = requestInfo

  let img
  if (bloodGroup === 'A+') img = ap
  else if (bloodGroup === 'A-') img = an
  else if (bloodGroup === 'B+') img = bp
  else if (bloodGroup === 'B-') img = bn
  else if (bloodGroup === 'O+') img = op
  else if (bloodGroup === 'O-') img = on
  else if (bloodGroup === 'AB+') img = abp
  else img = abn

  useEffect(() => {
    const fetchUser = async () => {
      if (uid) {
        const res = await getDoc(doc(db, 'users', uid))
        setRequestUserInfo({ name: res.data().name, phone: res.data().phone })
      }
    }

    const unsub = onSnapshot(
      doc(db, 'requests', id),
      (doc) => {
        setLoading(false)
        setRequestInfo({ id: doc.id, ...doc.data() })

        fetchUser()
      },
      (error) => {
        console.log(error)
        setError('Something went wrong!')
      }
    )

    return () => {
      unsub()
    }
  }, [id, uid])

  return (
    <>
      <SubHero title={'Request Details'} text={`Request Id: ${id}`} />

      <Container className='mx-auto my-5' style={{ maxWidth: '900px' }}>
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
                <Row>
                  <Col sm={4} className='center'>
                    <Card.Img
                      src={img}
                      style={{ maxWidth: '200px' }}
                      className='p-3'
                    ></Card.Img>
                  </Col>

                  <Col sm={8}>
                    <Card.Text>Blood Group: {bloodGroup}</Card.Text>
                    <Card.Text>Problem: {problem}</Card.Text>
                    <Card.Text>Time: {time}</Card.Text>
                    <Card.Text>Date: {date}</Card.Text>
                    <Card.Text>
                      Location: {location}, {district}
                    </Card.Text>
                    <Card.Text>Contuct Number: {contact}</Card.Text>
                    <Card.Text>Required Number of Bags: {numBag}</Card.Text>
                    <Card.Text>Bag managed: {numManaged}</Card.Text>
                    <Card.Text>
                      Posted in:{' '}
                      {new Date(createdAt?.toDate()).toLocaleString()}
                      {/* ({moment(createdAt?.toDate()).fromNow()}) */}
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>

              <Accordion className='mt-3'>
                <Accordion.Item eventKey='0'>
                  <Accordion.Header>
                    <p style={{ lineHeight: 0 }}>Request user's info</p>
                  </Accordion.Header>

                  <Accordion.Body>
                    <p>
                      <span className='text-bold'>Name: </span>{' '}
                      {requestUserInfo.name}
                    </p>
                    <Card.Text>
                      Contuct Number: {requestUserInfo.phone}
                    </Card.Text>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              {(uid === userInfo.uid || userInfo.isAdmin) && (
                <div className='mt-3'>
                  <Link to={`/feed/${id}/edit`}>
                    <Button>
                      <i className='fa-solid fa-pen-to-square me-3'></i>
                      Edit Request
                    </Button>
                  </Link>
                </div>
              )}
            </Card>
          </>
        )}
      </Container>
    </>
  )
}

export default RequestDetailsScreen
