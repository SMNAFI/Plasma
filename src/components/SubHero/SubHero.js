import React from 'react'
import { Container } from 'react-bootstrap'
import Header from '../Header'
import HeaderFixed from '../HeaderFixed/HeaderFixed'
import './SubHero.css'

const SubHero = ({ title, text }) => {
  return (
    <section className='sub-hero-container'>
      <Header />
      <HeaderFixed />
      <Container>
        <div className='center sub-hero-sub-container mx-auto'>
          <div>
            <h1 className='sub-hero-title '>{title}</h1>
            <p className='sub-hero-text'>{text}</p>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default SubHero
