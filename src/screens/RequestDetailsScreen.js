import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
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
    const unsub = onSnapshot(
      doc(db, 'requests', id),
      (doc) => {
        setLoading(false)
        setRequestInfo({ id: doc.id, ...doc.data() })
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
      <SubHero title={'Request Details'} text={`Request Id: ${id}`} />

      <Container className='mx-auto my-5' style={{ maxWidth: '700px' }}>
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
                <Row className='align-items-center justify-content-center'>
                  <Col sm={4}>
                    <div className='text-center mb-5'>
                      <Card.Img src={img} className='type-img'></Card.Img>
                    </div>
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
                      {new Date(createdAt?.toDate()).toLocaleString()} (
                      {moment(createdAt?.toDate()).fromNow()})
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
              {uid === userInfo.uid && (
                <Link to={`/feed/${id}/edit`}>
                  <Button>
                    <i className='fa-solid fa-pen-to-square me-3'></i>
                    Edit Request
                  </Button>
                </Link>
              )}
            </Card>
          </>
        )}
      </Container>
    </>
  )
}

export default RequestDetailsScreen
