import React from 'react'
import { Link } from 'react-router-dom'
import './SaveLives.css'

const SaveLives = () => {
  return (
    <section className='save-lives center'>
      <div>
        <h2 className='save-life-title'>Start Saving Life</h2>
        <p className=' save-life-text'>
          Become a donor or request for blood and help save lives
        </p>

        <Link to='/register'>
          <button className='btn-find-blood mt-4'>Register</button>
        </Link>
      </div>
    </section>
  )
}

export default SaveLives
