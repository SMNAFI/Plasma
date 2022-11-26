import React from 'react'
import { Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import LoginScreen from '../screens/LoginScreen'

const ProtectedRoute = () => {
  const isAuth = useAuth()

  return isAuth ? <Outlet /> : <LoginScreen />
}

export default ProtectedRoute
