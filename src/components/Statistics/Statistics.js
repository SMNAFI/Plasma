import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import './Statistics.css'

const Statistics = () => {
  const [donars] = useState(56)
  const [requests] = useState(157)
  const [success] = useState(99)

  const { ref: counterRef, inView } = useInView()

  useEffect(() => {
    // fetching data from firebase
  })

  return (
    <section className='statistics-container' ref={counterRef}>
      <div className='container '>
        <h1 className='text-center' style={{ paddingTop: '90px' }}>
          About Our Platform
        </h1>
        <Row className='mt-5'>
          <Col lg={4} className='my-3'>
            <h3 className='text-center'>Total Donars</h3>
            {inView ? (
              <h2 className='count'>
                <CountUp start={0} end={donars} duration={2} />
              </h2>
            ) : null}
          </Col>
          <Col lg={4} className='my-3'>
            <h3 className='text-center'>Total Requests</h3>
            {inView ? (
              <h2 className='count'>
                <CountUp start={0} end={requests} duration={2} />
              </h2>
            ) : null}
          </Col>
          <Col lg={4} className='my-3'>
            <h3 className='text-center'>Total Managed Request</h3>
            {inView ? (
              <h2 className='count'>
                <CountUp start={0} end={success} duration={2} />
              </h2>
            ) : null}
          </Col>
        </Row>
      </div>
    </section>
  )
}

export default Statistics
