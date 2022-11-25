import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Donar = ({ donar }) => {
  const { id, name, phone, area, district, bloodGroup } = donar
  return (
    <Card className='my-3 p-3 rounded'>
      <Card.Body>
        <Card.Title as='h1'> {bloodGroup}</Card.Title>
        <Card.Text>Name: {name}</Card.Text>
        <Card.Text>Blood Group: {bloodGroup}</Card.Text>
        <Card.Text>Phone Number: {phone}</Card.Text>
        <Card.Text>
          Address: {area}, {district}
        </Card.Text>
        <Link to={`/donars/${id}`}>
          <Button>
            <i className='fa-solid fa-eye me-3'></i>Details
          </Button>
        </Link>
      </Card.Body>
    </Card>
  )
}

export default Donar
