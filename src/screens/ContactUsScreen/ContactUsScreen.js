import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { Row, Col, Container } from 'react-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import './ContactUsScreen.css'
import SubHero from '../../components/SubHero/SubHero'
import Required from './../../components/Required'

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
      <SubHero
        title={'Connect with us'}
        text={
          'Whether you want some help or just to ask us a question, you are welcome to do it using the form below.'
        }
      />

      <Container>
        <div className='my-5 mx-auto' style={{ maxWidth: '750px' }}>
          {loading && <Loader />}
          {success && <Message>Thank you for your message.</Message>}
          {error && <Message variant='danger'>{error}</Message>}

          <form ref={form} onSubmit={sendEmail}>
            <Row>
              <Col md={6}>
                <label>
                  Name
                  <Required />
                </label>
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
                <label>
                  Email
                  <Required />
                </label>
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
              <label>
                Message
                <Required />
              </label>
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

            <div className='text-center'>
              <button type='submit' className='btn-main'>
                Send Message
              </button>
            </div>
          </form>
        </div>
      </Container>
    </>
  )
}

export default ContactUsScreen
