import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import User from './pages/User'
import Logo from './components/Logo'
import GlobalStyles from './styles/GlobalStyles'

const App = () => {
  return (
    <BrowserRouter>
      <Logo />
      <GlobalStyles />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/u" component={User} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
