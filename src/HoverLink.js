import React from 'react'
import { Link } from 'react-router-dom'

const HoverLink = ({ routing, text, href }) => {

    if (routing) {
        return (
            (<a className='hoverLink'><Link to = {routing}><b>{text}</b></Link></a>) 
        
          )
    }

    else {
        return (<a style = {{textDecoration: "none"}} target = "_blank" href = {href} className='hoverLink'><b>{text}</b></a>)

    }

}

export default HoverLink