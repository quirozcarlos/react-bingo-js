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

import { useUser } from './context/UserContext'

import { getItem } from './utils'

const userData = getItem('userdata')

export const App = () => {
  const [loaded, setLoaded] = useState(false)
  const onlineStatus = useOnlineStatus()
  const [userState, setUserState] = useUser()

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 1000)
  }, [])

  useEffect(() => {
    setUserState(userData)
  }, [userData])

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
                <Route exact path='/'>
                  {!userState?.board ? (
                    <HomePage />
                  ) : (
                    <Redirect to='/pre-game' />
                  )}
                </Route>
                <Route exact path='/pre-game'>
                  {userState?.board ? (
                    <PreGame />
                  ) : (
                    <Redirect to='/' />
                  )}
                </Route>
                <Route exact path='/lobby'>
                  {userState?.board ? (
                    <Lobby />
                  ) : (
                    <Redirect to='/' />
                  )}
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
