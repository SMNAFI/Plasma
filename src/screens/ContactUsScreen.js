import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { Row, Col, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import './ContactUsScreen.css'

const ContactUsScreen = () => {
  // const [name, setName] = useState('')
  // const [email, setEmail] = useState('')
  // const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const form = useRef()

  const sendEmail = (e) => {
    e.preventDefault()

    setLoading(true)
    setMessage(null)
    setError(null)

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          setLoading(false)
          setMessage('Thank you for your message.')
        },
        (error) => {
          console.log(error.text)
          setLoading(false)
          setError(error.text)
        }
      )
  }
  return (
    <>
      <h1 className='text-center my-5'>Contact Us</h1>

      <div className='form-container mx-auto'>
        {loading && <Loader />}
        {message && <Message>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}

        <form ref={form} onSubmit={sendEmail}>
          <Row>
            <Col md={6}>
              <label>Name</label>
              <br />
              <input
                type='text'
                name='user_name'
                className='w-100 input'
                required={true}
              />
            </Col>
            <Col md={6}>
              <label>Email</label>
              <br />
              <input
                type='email'
                name='user_email'
                className='w-100 input'
                required={true}
              />
            </Col>
          </Row>
          <div className='my-3'>
            <label>Message</label>
            <br />
            <textarea
              name='message'
              rows='5'
              className='w-100 input'
              required={true}
            />
          </div>

          <Button type='submit'>Send</Button>
        </form>
      </div>
    </>
  )
}

export default ContactUsScreen
