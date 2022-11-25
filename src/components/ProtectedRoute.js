import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import LoginScreen from '../screens/LoginScreen'

const useAuth = () => {
  const userDetails = useSelector((state) => state.userDetails)
  const { userInfo } = userDetails

  if (userInfo) return true

  return false
}

const ProtectedRoute = () => {
  const isAuth = useAuth()

  return isAuth ? <Outlet /> : <LoginScreen />
}

export default ProtectedRoute
