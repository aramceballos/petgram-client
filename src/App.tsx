import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import User from './pages/User'
import Login from './pages/Login'
import Logo from './components/Logo'
import GlobalStyles from './styles/GlobalStyles'
import NavBar from './components/NavBar'
import { useToken } from './hooks/useToken'

const App = () => {
  const { token, setToken } = useToken()

  return (
    <BrowserRouter>
      <Logo />
      <GlobalStyles />
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/u" component={User} />
          </Switch>
          <NavBar />
        </>
      )}
    </BrowserRouter>
  )
}

export default App
