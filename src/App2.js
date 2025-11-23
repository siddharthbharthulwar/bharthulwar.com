import React from 'react'
import About from './About'
import Home from './Home'
import { BrowserRouter } from 'react-router-dom'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'
import './index.css'
import Writing from './Writing'
import Contact from './Contact'
import { isMobile } from 'react-device-detect';

function App () {

  const hrs = new Date().getHours();
  var darkMode = (hrs < 7 || hrs >= 19) && !isMobile;
  darkMode ? document.body.style = 'background: #222222;' : document.body.style = 'background: white;';

  return (
    <div>
      <BrowserRouter>
        <div style = {{color: darkMode ? "white" : "black", margin: "auto", textAlign: "left", maxWidth: isMobile ? "90%" : "35%", marginTop: "15%"}}>
          <Switch>
            <Route exact path="/">
              <About />
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