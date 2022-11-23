import React from 'react'
import { Link } from 'react-router-dom'

function HomeScreen() {
  return (
    <>
      <h1 className='text-center mt-5'>Welcome to Plasma</h1>

      <h4>How it works</h4>
      <p>Register/Login to our platform</p>
      <Link to='/profile'>
        <p>Become a donar</p>
      </Link>
      <Link to='/request'>
        <p>Request for blood</p>
      </Link>
      <Link to='/donars'>
        <p>Find donars</p>
      </Link>
    </>
  )
}

export default HomeScreen
