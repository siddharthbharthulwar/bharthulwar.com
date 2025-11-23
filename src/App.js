import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import { Switch } from 'react-router'
import { Link } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <HashRouter>
        <div>
          <Link to = "/">Sid Bharthulwar</Link>
          <Link to = "/classes">Harvard Q Index</Link>
        </div>
        <Switch>
          <Route exact path = "/">
            <div>
              about
            </div>
          </Route>
          <Route exact path = "/classes">
            <div>
              classes
            </div>
          </Route>
        </Switch>
      </HashRouter>
    </div>
  )
}

export default App