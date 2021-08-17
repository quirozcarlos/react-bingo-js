import React, { useEffect, useState } from 'react'
import {
  Switch,
  Route,
  Redirect,
  Link
} from 'react-router-dom'

import { Header, Footer, SpinnerLoader, NotNetworkConnectivity, useOnlineStatus, Alert } from 'ordering-ui'

import { HomePage } from './pages/Home'
import { Lobby } from './pages/Lobby'
import { PageNotFound } from './pages/PageNotFound'

import { ListenPageChanges } from './components/ListenPageChanges'

export const App = () => {
  const [loaded, setLoaded] = useState(false)
  const onlineStatus = useOnlineStatus()

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 1000)
  }, [])

  return (
    <>
      <ListenPageChanges />
      {
        !loaded && (
          <SpinnerLoader />
        )
      }
      {
        loaded && (
          <>
            {/* <Header
              isHome={isHome}
              location={location}
            /> */}
            <NotNetworkConnectivity />
            {onlineStatus && (
              <Switch>
                <Route exact path='/home'>
                  <HomePage />
                </Route>
                <Route exact path='/'>
                  <HomePage />
                </Route>
                <Route exact path='/lobby'>
                  <Lobby />
                </Route>
                <Route path='*'>
                  <PageNotFound />
                </Route>
              </Switch>
            )}
          </>
        )
      }
    </>
  )
}
