import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div style = {{marginBottom: "50px"}}> 
        <div style={{float: "left", textAlign: "left"}}>
            <div>
                <a className = "footerLink"><Link to="/">Back</Link></a>
            </div>
        </div>
        <div style={{float: "right"}}>
            <div>Sid Bharthulwar</div>
            {/* <img src="https://hitwebcounter.com/counter/counter.php?page=7811144&style=0007&nbdigits=5&type=ip&initCount=0" id = "counter" border="0" /> */}
        </div>
    </div>
  )
}

export default Footer