import React from 'react'
import About from './About'
// import Helmet from 'react-helmet'
import Home from './Home'
import { BrowserRouter } from 'react-router-dom'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './index.css'
import Writing from './Writing'
import Projects from './Projects'
import Classes from './courses/Classes'
import Contact from './Contact'

function App () {

  const hrs = new Date().getHours();
  var darkMode = hrs < 7 || hrs >= 19;
  
  darkMode ? document.body.style = 'background: #212121;' : document.body.style = 'background: #f5f5f5;';

  return (
    <div style = {{color: darkMode ? "white" : "black", margin: "auto", textAlign: "center", maxWidth: "650px", marginTop: "15%", fontFamily: "Courier"}}>
      {/* <Helmet>
            <meta name="theme-color" content={document.body.style} />
            <meta name="msapplication-navbutton-color" content={document.body.style} />
            <meta name="apple-mobile-web-app-status-bar-style" content={document.body.style}></meta>
      </Helmet> */}
      <BrowserRouter>
        <div>

          <Switch>
            <Route exact path="/">
              <About />
            </Route>
            <Route path = "/classes">
              <Classes />
            </Route>
            <Route path = "/writing">
              <Writing />
            </Route>
            <Route path = "/contact">
              <Contact />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App