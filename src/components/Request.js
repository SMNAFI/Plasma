import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'

const Donar = ({ request }) => {
  const userDetails = useSelector((state) => state.userDetails)
  const { userInfo } = userDetails

  const {
    uid,
    id,
    bloodGroup,
    time,
    date,
    contact,
    location,
    district,
    isManaged,
    createdAt,
  } = request
  return (
    <Card className='my-3 p-3 rounded'>
      <Card.Body>
        <Card.Title as='h1'> {bloodGroup}</Card.Title>
        <Card.Text>Blood Group: {bloodGroup}</Card.Text>
        <Card.Text>Time: {time}</Card.Text>
        <Card.Text>Date: {date}</Card.Text>
        <Card.Text>
          Location: {location}, {district}
        </Card.Text>
        <Card.Text>Contuct Number: {contact}</Card.Text>
        <Card.Text>
          Status: {isManaged ? 'Blood is managed' : 'Blood not managed yet'}
        </Card.Text>
        <Card.Text>
          Posted in: {moment(createdAt?.toDate()).fromNow()}
        </Card.Text>
      </Card.Body>

      <Row className='align-items-center'>
        <Col>
          <Link to={`/feed/${id}`}>
            <Button>
              <i className='fa-solid fa-eye me-3'></i>Details
            </Button>
          </Link>
        </Col>
        <Col>
          {uid === userInfo.uid && (
            <Link to={`/feed/${id}/edit`}>
              <Card.Text as='h3'>
                <i className='fa-solid fa-pen-to-square my-auto'></i>
              </Card.Text>
            </Link>
          )}
        </Col>
      </Row>
    </Card>
  )
}

export default Donar
