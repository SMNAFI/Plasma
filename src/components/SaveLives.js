import React from 'react'
import { Link } from 'react-router-dom'
import './SaveLives.css'

const SaveLives = () => {
  return (
    <section className='save-lives'>
      <h2 className='text-center text-white'>Start Saving Life</h2>
      <h4 className='text-center text-white mt-4'>
        Become a donor or request for blood and help save lives
      </h4>
      <Link to='/register'>
        <button className='btn-find-blood mt-5'>Register</button>
      </Link>
    </section>
  )
}

export default SaveLives
