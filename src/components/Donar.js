import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ap from '../assets/images/a+.svg'
import bp from '../assets/images/b+.svg'
import op from '../assets/images/o+.svg'
import abp from '../assets/images/ab+.svg'
import an from '../assets/images/a-.svg'
import bn from '../assets/images/b-.svg'
import on from '../assets/images/o-.svg'
import abn from '../assets/images/ab-.svg'

const Donar = ({ donar }) => {
  const { id, name, phone, area, district, bloodGroup } = donar

  let img
  if (bloodGroup === 'A+') img = ap
  else if (bloodGroup === 'A-') img = an
  else if (bloodGroup === 'B+') img = bp
  else if (bloodGroup === 'B-') img = bn
  else if (bloodGroup === 'O+') img = op
  else if (bloodGroup === 'O-') img = on
  else if (bloodGroup === 'AB+') img = abp
  else img = abn

  return (
    <Card className='my-3 p-3 rounded'>
      <Card.Body>
        <Row className='align-items-center justify-content-center'>
          <Col sm={4}>
            <div className='mb-4 text-center'>
              <Card.Img src={img} className='type-img'></Card.Img>
            </div>
          </Col>
          <Col sm={8}>
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
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default Donar
