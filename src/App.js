import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DonarsScreen from './screens/DonarsScreen'
import RequestFeedScreen from './screens/RequestFeedScreen'
import FaqScreen from './screens/FaqScreen'
import HomeScreen from './screens/HomeScreen'
import RequestPage from './screens/RequestScreen'
import DonarProfileScreen from './screens/DonarDetailsScreen'
import RequestDetailsScreen from './screens/RequestDetailsScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import RequestEditScreen from './screens/RequestEditScreen'
import PageNotFound from './screens/PageNotFound'
import ProtectedRoute from './components/ProtectedRoute'
import ContactUsScreen from './screens/ContactUsScreen'
import ForgetPasswordScreen from './screens/ForgetPasswordScreen'
import AdminRoute from './components/AdminRoute'
import ManageUsersScreen from './screens/ManageUsersScreen'
import ManageRequestsScreen from './screens/ManageRequestsScreen'

const App = () => {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/home' element={<HomeScreen />} />
          <Route path='/faq' element={<FaqScreen />} />
          <Route path='/contact' element={<ContactUsScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/forget-password' element={<ForgetPasswordScreen />} />

          <Route element={<ProtectedRoute />}>
            <Route path='/request' element={<RequestPage />} />
            <Route path='/feed' element={<RequestFeedScreen />} />
            <Route path='/feed/:id' element={<RequestDetailsScreen />} />
            <Route path='/feed/:id/edit' element={<RequestEditScreen />} />
            <Route path='/donars' element={<DonarsScreen />} />
            <Route path='/donars/:id' element={<DonarProfileScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
          </Route>

          {/* admin only */}
          <Route element={<AdminRoute />}>
            <Route path='/admin/users' element={<ManageUsersScreen />} />
            <Route path='/admin/requests' element={<ManageRequestsScreen />} />
          </Route>

          <Route path='/*' element={<PageNotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
