import React from 'react'

import Navbar from '../userComponents/Navbar'
import Footer from '../userComponents/Footer'
import ImageSlider from '../userComponents/ImageSlider'
import WelcomeBox from '../userComponents/WelcomeBox'

export default function Homepage() {
    return (
        <div id='home'>
            <Navbar/>
            <ImageSlider/>
            <WelcomeBox/>
          
            <Footer/>
        </div>
    )
}


