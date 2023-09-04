import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import Time from './Time'

const Home = () => {
  return (
    <div style = {{textAlign: "center"}}>
        <div>
          <div class = "nameBoxDiv" >
          </div>
          <div className = "routerDiv">
          <ul>
              <p></p>
              <li className= "routerLink">
                <Link to="/about">About</Link>
              </li>
              <p></p>
              <li className = "routerLink">
                <Link to="/projects">Projects</Link>
              </li>
              <p></p>
              <li className= "routerLink">
                <Link to="/writing">Writing</Link>
              </li>
              <p></p>
              <li className = "routerLink">
                <Link to="/contact">Contact</Link>
              </li>
              <p></p>
          </ul>
          </div>
        </div>

    </div>
  )
}

export default Home