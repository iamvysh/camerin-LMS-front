import React from 'react'
import './WelcomeBox.css'

function WelcomeBox() {
    return (
        <div className='welcome-box'>
            <p className='welcome-title'>WELCOME TO EDUCOM</p>
            <p className='welcome-message'>Interactions with Student , Teacher , Librarian<br/>
            <span className='welcome-submessage'>An mvp Model</span></p>
        </div>
    )
}

export default WelcomeBox
