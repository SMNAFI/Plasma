import React from 'react'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import error from '../assets/images/404.svg'

const PageNotFound = () => {
  return (
    <div className='text-center'>
      <h1 className='mt-5'>Are you lost?</h1>
      <div>
        <Image
          src={error}
          alt='page not found'
          fluid
          style={{ maxHeight: '450px' }}
        />
      </div>

      <h5>
        <Link to='/'>Go Back</Link>
      </h5>
    </div>
  )
}

export default PageNotFound
