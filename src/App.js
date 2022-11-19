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

const App = () => {
  return (
    <BrowserRouter>
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
            {/* <Route path='/login' element={<LoginPage />} /> */}
            {/* <Route path='/register' element={<RegisterPage />} /> */}
            {/* <Route path='/profile' element={<ProfilePage />} /> */}
          </Routes>
        </Container>
      </main>
    </BrowserRouter>
  )
}

export default App
