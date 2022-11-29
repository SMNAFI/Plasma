import React from 'react'
import Join from '../components/Join/Join'
import SaveLives from '../components/SaveLives'
import Statistics from '../components/Statistics/Statistics'
import MainHero from '../components/MainHero/MainHero'

function HomeScreen() {
  return (
    <>
      <MainHero />
      <Join />
      <Statistics />
      <SaveLives />
    </>
  )
}

export default HomeScreen
