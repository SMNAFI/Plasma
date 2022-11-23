import React, { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'

const ContactUsScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [text, setText] = useState('')

  const submitHandler = (e) => {
    e.preventDefaul()
  }
  return (
    <>
      <h1 className='text-center my-5'>Contact Us</h1>
      <Form onSubmit={submitHandler}>
        <Row>
          <Col md={6}>
            <Form.Group controlId='name' className='mb-3'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Your name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={true}
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId='email' className='mb-3'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Your email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId='text' className='mb-3'>
          <Form.Label>Message</Form.Label>
          <Form.Control
            as='textarea'
            placeholder='Your Message'
            value={text}
            onChange={(e) => setText(e.target.value)}
            required={true}
          ></Form.Control>
        </Form.Group>

        <Button type='submit'>Send your message</Button>
      </Form>
    </>
  )
}

export default ContactUsScreen
