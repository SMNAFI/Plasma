import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import area from '../../assets/images/area.svg'
import connect from '../../assets/images/connect.svg'
import savelife from '../../assets/images/savelife.svg'
import emergency from '../../assets/images/emergency.svg'

const Join = () => {
  return (
    <section style={{ background: '#fbfbfb' }}>
      <Container
        style={{
          maxWidth: '1000px',
          paddingTop: '80px',
          paddingBottom: '80px',
        }}
        className='mx-auto'
      >
        <div style={{ maxWidth: '750px' }} className='mx-auto text-center'>
          <h1>Join the Cause</h1>
          <h5>
            Join our cause and help us save more lives. Everyone should have the
            right to get a blood transfusion.
          </h5>
        </div>

        <Row className='align-items-center'>
          <Col lg={6}>
            <h4>
              <i className='fa-solid fa-magnifying-glass me-3'></i>Find Donors
              in your Area
            </h4>
            <p>
              Get connected in a matter of minutes at zero cost. Our App ships
              with a smart system that finds the closest blood donors. Our
              automated blood donation system works efficiently whenever someone
              needs a blood transfusion.
            </p>
          </Col>
          <Col lg={6} className='d-flex justify-content-center'>
            <Image src={area} style={{ height: '400px' }} />
          </Col>
        </Row>

        <Row className='align-items-center'>
          <Col lg={6} className='d-flex justify-content-center'>
            <Image src={connect} style={{ height: '400px' }} />
          </Col>
          <Col lg={6}>
            <h4>
              <i className='fa-regular fa-clock me-3'></i>Answer to Emergencies
            </h4>
            <p>
              As soon as a new blood request is raised, it is routed among our
              local volunteer blood donors. We know time matters! So we keep you
              updated with real-time notifications sent directly to you via SMS
              (text message) or the installed mobile app
            </p>
          </Col>
        </Row>

        <Row className='align-items-center'>
          <Col lg={6}>
            <h4>
              <i className='fa-solid fa-mobile-screen me-3'></i>Made for
              Everyone
            </h4>
            <p>
              All you need to do is send a text message to 8655, "blood need
              (blood-group) in (your-city)", in any language you want. Our
              system is smart enough to understand anything you write and helps
              you find a donor within minutes if not seconds.
            </p>
          </Col>
          <Col lg={6} className='d-flex justify-content-center'>
            <Image src={emergency} style={{ height: '400px' }} />
          </Col>
        </Row>

        <Row className='align-items-center'>
          <Col lg={6} className='d-flex justify-content-center'>
            <Image src={savelife} style={{ height: '400px' }} />
          </Col>
          <Col lg={6}>
            <h4>
              <i className='fa-solid fa-award me-3'></i>You are someone's Hero
            </h4>
            <p>
              In as little as few minutes, you can become someone's unnamed,
              unknown, but all-important Hero. Saving a life is a noble work
              that starts very simply and easily. Donate Blood or donate Money,
              every form of contribution you make is important, valued and
              essential in our shared mission to save lives.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Join
