import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProfileScreen = () => {
  const userDetails = useSelector((state) => state.userDetails)
  const { userInfo } = userDetails
  const navigate = useNavigate()
  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
  }, [navigate, userInfo])

  const [name, setName] = useState(userInfo ? userInfo.name : '')
  const [phone, setPhone] = useState(userInfo ? userInfo.phone : '')
  const [bloodGroup, setBloodGroup] = useState(
    userInfo
      ? userInfo.bloodGroup
        ? userInfo.bloodGroup
        : 'Select your blood group'
      : 'Select your blood group'
  )
  const [donar, setDonar] = useState(userInfo ? userInfo.isDonar : false)
  const [lastDonation, setLastDonation] = useState(
    userInfo ? userInfo.lastDonation : ''
  )
  const [numDonation, setNumDonation] = useState(
    userInfo ? userInfo.numDonation : 0
  )
  const [address, setAddress] = useState(userInfo ? userInfo.address : '')
  const [district, setDistrict] = useState(userInfo ? userInfo.district : '')
  const [division, setDivision] = useState(userInfo ? userInfo.division : '')
  //   const [isAvailable, setIsAvailable] = useState(
  //     userInfo.isAvailable ? userInfo.isAvailable : false
  //   )
  const [response] = useState(userInfo ? userInfo.response : 0)

  const updateHandler = (e) => {
    e.preventDefault()
    console.log('Update')
    console.log(e)
  }

  return (
    <>
      <h1 className='my-5 text-center'>
        Welcome, {userInfo ? userInfo.name : ''}
      </h1>
      <h4 className='my-5 text-center'>
        You have respond to {response} request
      </h4>
      <Form onSubmit={updateHandler}>
        <Row>
          <Col lg={6}>
            <Form.Group controlId='name' className='my-3'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={true}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group controlId='phone' className='my-3'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type='text'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                pattern='[0-9]{11}'
                title='11 digits phone number'
                required={donar}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId='bloodGroup' className='my-3'>
          <Form.Label>Blood Group</Form.Label>
          <Form.Select
            value={bloodGroup}
            size='sm'
            onChange={(e) => setBloodGroup(e.target.value)}
            required={donar}
          >
            <option>Select your blood group</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId='donar' className='my-3'>
          <Form.Check
            type='switch'
            id='custom-switch'
            label='Want to be a donar?'
            checked={donar}
            onChange={(e) => setDonar(e.target.checked)}
          />
        </Form.Group>

        <Row>
          <Col lg={6}>
            <Form.Group controlId='numDonation' className='my-3'>
              <Form.Label>How many times did you donate blood?</Form.Label>
              <Form.Control
                type='number'
                placeholder='Num of bages'
                value={numDonation}
                onChange={(e) => setNumDonation(e.target.value)}
                required={true}
                min='0'
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group controlId='lastDonation' className='my-3'>
              <Form.Label>Last Donation Date</Form.Label>
              <Form.Control
                type='date'
                placeholder='Date'
                value={lastDonation}
                onChange={(e) => setLastDonation(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6} lg={4}>
            <Form.Group controlId='address' className='my-3'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required={donar}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={6} lg={4}>
            <Form.Group controlId='district' className='my-3'>
              <Form.Label>District</Form.Label>
              <Form.Control
                type='text'
                placeholder='district'
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required={donar}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={6} lg={4}>
            <Form.Group controlId='division' className='my-3'>
              <Form.Label>Division</Form.Label>
              <Form.Control
                type='text'
                placeholder='division'
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                required={donar}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Button type='submit' varient='primary' className='mt-3'>
          Update Profile
        </Button>
      </Form>
    </>
  )
}

export default ProfileScreen
