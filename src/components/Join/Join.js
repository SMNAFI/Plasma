import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import area from '../../assets/images/area.svg'
import connect from '../../assets/images/connect.svg'
import savelife from '../../assets/images/savelife.svg'
// import emergency from '../../assets/images/emergency.svg'
import './Join.css'

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
        <div style={{ maxWidth: '600px' }} className='mx-auto text-center my-3'>
          <h1 style={{ color: '#ff3f62', fontSize: '2.2rem' }}>
            Join the Cause
          </h1>
          <p style={{ fontSize: '1.3rem' }}>
            Join our cause and help us save more lives. Everyone should have the
            right to get a blood transfusion.
          </p>
        </div>

        <Row>
          <Col lg={6} className='center order-lg-1 p-3'>
            <Image src={area} style={{ maxHeight: '400px' }} />
          </Col>
          <Col lg={6} className='center order-lg-0 p-sm-3 p-md-5 p-lg-0'>
            <div>
              <p className='join-sub-title'>
                <i className='fa-solid fa-magnifying-glass me-3 join-icon'></i>
                Find Donors in your Area
              </p>
              <p className='join-sub-text'>
                Get connected in a matter of minutes at zero cost. Find the
                closest blood donors through our platform whenever someone needs
                a blood transfusion.
              </p>
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={6} className='center p-3'>
            <Image src={connect} style={{ maxHeight: '400px' }} />
          </Col>
          <Col lg={6} className='center p-sm-3 p-md-5 p-lg-0'>
            <div>
              <p className='join-sub-title'>
                <i className='fa-regular fa-clock me-3 join-icon'></i>Answer to
                Emergencies
              </p>
              <p className='join-sub-text'>
                As soon as a new blood request is raised, it is routed among our
                local volunteer blood donors. We know time matters! So we keep
                you updated with real-time.
              </p>
            </div>
          </Col>
        </Row>

        {/* <Row>
          <Col lg={6} className='center order-lg-1 p-3'>
            <Image src={emergency} style={{ maxHeight: '400px' }} />
          </Col>
          <Col lg={6} className='center order-lg-0 p-sm-3 p-md-5 p-lg-0'>
            <div>
              <p className='join-sub-title'>
                <i className='fa-solid fa-mobile-screen me-3 join-icon'></i>Made
                for Everyone
              </p>

              <p className='join-sub-text'>
                All you need to do is send a text message to 8655, "blood need
                (blood-group) in (your-city)", in any language you want. Our
                system is smart enough to understand anything you write and
                helps you find a donor within minutes if not seconds.
              </p>
            </div>
          </Col>
        </Row> */}

        <Row>
          <Col lg={6} className='center order-lg-1 p-3'>
            <Image src={savelife} style={{ maxHeight: '400px' }} />
          </Col>
          <Col lg={6} className='center order-lg-0 p-sm-3 p-md-5 p-lg-0'>
            <div>
              <p className='join-sub-title'>
                <i className='fa-solid fa-award me-3 join-icon'></i>You are
                someone's Hero
              </p>

              <p className='join-sub-text'>
                In as little as few minutes, you can become someone's unnamed,
                unknown, but all-important Hero. Saving a life is a noble work
                that starts very simply and easily. Donate Blood or donate
                Money, every form of contribution you make is important, valued
                and essential in our shared mission to save lives.
              </p>
            </div>
          </Col>
        </Row>

        {/* <Row>
          <Col lg={6} className='center p-3'>
            <Image src={savelife} style={{ maxHeight: '400px' }} />
          </Col>
          <Col lg={6} className='center p-sm-3 p-md-5 p-lg-0'>
            <div>
              <p className='join-sub-title'>
                <i className='fa-solid fa-award me-3 join-icon'></i>You are
                someone's Hero
              </p>
              <p className='join-sub-text'>
                In as little as few minutes, you can become someone's unnamed,
                unknown, but all-important Hero. Saving a life is a noble work
                that starts very simply and easily. Donate Blood or donate
                Money, every form of contribution you make is important, valued
                and essential in our shared mission to save lives.
              </p>
            </div>
          </Col>
        </Row> */}
      </Container>
    </section>
  )
}

export default Join
