import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import HeroCarousel from '../components/HeroCarousel'

const Home = () => {
  return (
    <div>
      <HeroCarousel></HeroCarousel>
      <Hero></Hero>
      <LatestCollection></LatestCollection>
      <BestSeller></BestSeller>
      <OurPolicy></OurPolicy>
      <NewsletterBox></NewsletterBox>
    </div>
  )
}

export default Home