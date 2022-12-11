import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import './Statistics.css'
import { collection, getDocs, where } from 'firebase/firestore'
import { db } from '../../firebase'

const Statistics = () => {
  const [donarCount, setDonarCount] = useState(0)
  const [reqCount, setReqCount] = useState(0)
  const [managedCount, setMangedCount] = useState(0)

  const { ref: counterRef, inView } = useInView()

  useEffect(() => {
    const fetchData = async () => {
      const usersQ = await getDocs(
        collection(db, 'users'),
        where('isDonar', '==', true)
      )
      setDonarCount(usersQ.docs.length)

      const reqQ = await getDocs(collection(db, 'requests'))
      setReqCount(reqQ.docs.length)

      let managed = 0
      reqQ.forEach((doc) => {
        if (doc.data().isManaged) managed++
      })
      setMangedCount(managed)
    }

    fetchData()
  }, [])

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
                <CountUp start={0} end={donarCount} duration={1} />
              </h2>
            ) : null}
          </Col>
          <Col lg={4} className='my-3'>
            <h3 className='text-center'>Total Requests</h3>
            {inView ? (
              <h2 className='count'>
                <CountUp start={0} end={reqCount} duration={2} />
              </h2>
            ) : null}
          </Col>
          <Col lg={4} className='my-3'>
            <h3 className='text-center'>Total Managed Request</h3>
            {inView ? (
              <h2 className='count'>
                <CountUp start={0} end={managedCount} duration={2} />
              </h2>
            ) : null}
          </Col>
        </Row>
      </div>
    </section>
  )
}

export default Statistics
