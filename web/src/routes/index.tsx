import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Home, More, Login, Admin } from '../pages'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/mais/:id" component={More}/>
        <Route path="/login" component={Login}/>
        <Route path="/admin" component={Admin}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
