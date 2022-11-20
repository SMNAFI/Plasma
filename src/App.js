import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import DonarsScreen from './screens/DonarsScreen'
import RequestFeedScreen from './screens/RequestFeedScreen'
import FaqScreen from './screens/FaqScreen'
import HomeScreen from './screens/HomeScreen'
import RequestPage from './screens/RequestScreen'
import DonarProfileScreen from './screens/DonarDetailsScreen'
import RequestDetailsScreen from './screens/RequestDetailsScreen'
import Header from './components/Header'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/request' element={<RequestPage />} />
            <Route path='/feed' element={<RequestFeedScreen />} />
            <Route path='/feed/:id' element={<RequestDetailsScreen />} />
            <Route path='/donars' element={<DonarsScreen />} />
            <Route path='/donars/:id' element={<DonarProfileScreen />} />
            <Route path='/faq' element={<FaqScreen />} />
            {/* <Route path='/contact' element={<ContactPage />} /> */}
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
          </Routes>
        </Container>
      </main>
    </BrowserRouter>
  )
}

export default App
