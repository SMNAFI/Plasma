import React from 'react'
import Join from '../components/Join/Join'
import SaveLives from '../components/SaveLives/SaveLives'
import Statistics from '../components/Statistics/Statistics'
import MainHero from '../components/MainHero/MainHero'
import HowItWorks from '../components/HowItWorks'

function HomeScreen() {
  return (
    <>
      <MainHero />
      <Join />
      <HowItWorks />
      <Statistics />
      <SaveLives />
    </>
  )
}

export default HomeScreen
