import React from 'react'
import { Container } from 'react-bootstrap'
import Header from '../Header'
import HeaderFixed from '../HeaderFixed'
import './MainHero.css'

const MainHero = () => {
  return (
    <section className='hero'>
      <Header />
      <HeaderFixed />
      <Container>
        <div className='center' style={{ minHeight: '590px' }}>
          <div className='text-center'>
            <h1 className='title'>Welcome to Plasma</h1>
            <h3 className='sub-title mt-4'>
              Connecting blood donors with recipients
            </h3>
            <button className='btn-find-blood mt-5'>Find blood</button>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default MainHero
