import React from 'react'
import { Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import LoginScreen from '../screens/LoginScreen'
import { useSelector } from 'react-redux'

const AdminRoute = () => {
  const isAuth = useAuth()
  const userDetails = useSelector((state) => state.userDetails)
  const { userInfo } = userDetails

  return isAuth && userInfo.isAdmin ? <Outlet /> : <LoginScreen />
}

export default AdminRoute
