import React from 'react'
import { Outlet } from 'react-router-dom'
// import useAuth from '../hooks/useAuth'
import LoginScreen from '../screens/LoginScreen'
import { useSelector } from 'react-redux'

const ProtectedRoute = () => {
  // const isAuth = useAuth()

  const userDetails = useSelector((state) => state.userDetails)

  // return isAuth ? <Outlet /> : <LoginScreen />
  return userDetails.userInfo ? <Outlet /> : <LoginScreen />
}

export default ProtectedRoute
