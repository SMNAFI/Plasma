import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'

const Donar = ({ request }) => {
  // console.log(request)
  const userDetails = useSelector((state) => state.userDetails)
  const { userInfo } = userDetails

  const {
    uid,
    id,
    problem,
    bloodGroup,
    time,
    date,
    numBag,
    contact,
    location,
    district,
    numManaged,
    timestamp,
    // response,
  } = request
  return (
    <Card className='my-3 p-3 rounded'>
      <Card.Body>
        {uid === userInfo.uid && (
          <Link to={`/feed/${id}/edit`}>
            <h2>
              <i className='fa-solid fa-pen-to-square'></i>
            </h2>
          </Link>
        )}
        <Card.Text>Problem: {problem}</Card.Text>
        <Card.Text>Blood Group: {bloodGroup}</Card.Text>
        <Card.Text>Time: {time}</Card.Text>
        <Card.Text>Date: {date}</Card.Text>
        <Card.Text>Number of bages: {numBag}</Card.Text>
        <Card.Text>Contuct Number: {contact}</Card.Text>
        <Card.Text>
          Location: {location}, {district}
        </Card.Text>
        <Card.Text>Bag managed: {numManaged}</Card.Text>
        <Card.Text>
          <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
        </Card.Text>
        <Card.Text>
          <small>{moment(timestamp?.toDate()).fromNow()}</small>
        </Card.Text>
      </Card.Body>
      <Link to={`/feed/${id}`}>
        <Button>Details</Button>
      </Link>
    </Card>
  )
}

export default Donar
