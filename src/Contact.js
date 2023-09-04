import React from 'react'
import Footer from './Footer'
import HoverLink from './HoverLink'

const Contact = () => {
  return (
    <div>
        <h2>Contact Me</h2>
        <p>Let's talk: <HoverLink text = "LinkedIn" href = "https://linkedin.com/in/sbharthulwar"></HoverLink> or <HoverLink text = "Twitter" href = "https://twitter.com/bharthulwar"></HoverLink> or <br></br>
             sbharthulwar [@] college [dot] harvard [dot] edu</p>
        <Footer />
    </div>
  )
}

export default Contact