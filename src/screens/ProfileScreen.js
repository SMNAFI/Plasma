import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ProfileScreen() {
  const userDetails = useSelector((state) => state.userDetails)
  const { userInfo } = userDetails
  const { name } = userInfo

  const navigate = useNavigate()

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
  }, [navigate, userInfo])

  return (
    <>
      <h1 className='my-5 text-center'>Welcome, {name}</h1>
    </>
  )
}

export default ProfileScreen
