import React from 'react'
import { Button, ButtonGroup, Card, Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import ap from '../assets/images/a+.svg'
import bp from '../assets/images/b+.svg'
import op from '../assets/images/o+.svg'
import abp from '../assets/images/ab+.svg'
import an from '../assets/images/a-.svg'
import bn from '../assets/images/b-.svg'
import on from '../assets/images/o-.svg'
import abn from '../assets/images/ab-.svg'

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
    // isManaged,
    createdAt,
  } = request

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
          <Col sm={4} className='center'>
            <Card.Img src={img} style={{ maxWidth: '180px' }}></Card.Img>
          </Col>

          <Col sm={8}>
            <Card.Text>Time: {time}</Card.Text>
            <Card.Text>Date: {date}</Card.Text>
            <Card.Text>
              Location: {location}, {district}
            </Card.Text>
            <Card.Text>Contuct Number: {contact}</Card.Text>
            <Card.Text>
              Requested {moment(createdAt?.toDate()).fromNow()}
            </Card.Text>

            {uid === userInfo.uid ? (
              <ButtonGroup>
                <Link to={`/feed/${id}`}>
                  <Button className='me-2'>
                    <i className='fa-solid fa-eye me-3'></i>Details
                  </Button>
                </Link>
                <Link to={`/feed/${id}/edit`}>
                  <Button>
                    <i className='fa-solid fa-pen-to-square me-3'></i>Edit
                  </Button>
                </Link>
              </ButtonGroup>
            ) : (
              <Link to={`/feed/${id}`}>
                <Button>
                  <i className='fa-solid fa-eye me-3'></i>Details
                </Button>
              </Link>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default Donar
