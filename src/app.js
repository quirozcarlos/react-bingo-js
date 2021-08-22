import React, { useEffect, useState } from 'react'
import {
  Switch,
  Route,
  Redirect,
  Link
} from 'react-router-dom'

import { SpinnerLoader, NotNetworkConnectivity, useOnlineStatus } from 'ordering-ui'

import { HomePage } from './pages/Home'
import { Lobby } from './pages/Lobby'
import { PreGame } from './pages/PreGame'
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
                <Route exact path='/pregame'>
                  <PreGame />
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
