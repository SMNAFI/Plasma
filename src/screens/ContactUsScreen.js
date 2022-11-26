import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { Row, Col, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import './ContactUsScreen.css'

const ContactUsScreen = () => {
  const [user_name, setUser_name] = useState('')
  const [user_email, setUser_email] = useState('')
  const [message, setMessage] = useState('')

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const form = useRef()

  const sendEmail = (e) => {
    e.preventDefault()

    setLoading(true)
    setSuccess(false)
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
          setSuccess(true)

          setUser_name('')
          setUser_email('')
          setMessage('')
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
      <h1 className='text-center my-5'>Contact with us</h1>

      <div className='form-container mx-auto'>
        {loading && <Loader />}
        {success && <Message>Thank you for your message.</Message>}
        {error && <Message variant='danger'>{error}</Message>}

        <form ref={form} onSubmit={sendEmail}>
          <Row>
            <Col md={6}>
              <label>Name</label>
              <br />
              <input
                type='text'
                name='user_name'
                value={user_name}
                onChange={(e) => setUser_name(e.target.value)}
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
                value={user_email}
                onChange={(e) => setUser_email(e.target.value)}
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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
