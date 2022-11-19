import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// import { Link } from 'react-router-dom'

const Donar = ({ donar }) => {
  // console.log(donar)
  const {
    id,
    name,
    phone,
    address,
    district,
    division,
    bloodGroup,
    numDonation,
    response,
  } = donar
  return (
    <Card className='my-3 p-3 rounded'>
      <Card.Body>
        <Link style={{ textDecoration: 'none' }} to={`/donars/${id}`}>
          <Card.Text as='h3'>
            <i className='fa-solid fa-user fs-1'></i>
          </Card.Text>
        </Link>
        <Card.Title>{name}</Card.Title>
        <Card.Text>Blood Group: {bloodGroup}</Card.Text>
        <Card.Text>Total Response: {response}</Card.Text>
        <Card.Text>Total Donation: {numDonation}</Card.Text>
        <Card.Text>Phone Number: {phone}</Card.Text>
        <Card.Text>
          Address: {address}, {district}, {division}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Donar
