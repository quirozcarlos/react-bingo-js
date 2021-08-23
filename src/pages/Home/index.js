import React, { useState, useEffect } from 'react'
import { Button, useTheme } from 'ordering-ui'
import {
  Switch,
  Route,
  Redirect,
  Link
} from 'react-router-dom'
import {
  HeroContainer,
  ContentWrapper,
  Title,
  Slogan,
  DarkBackground
} from './styles'
import { getItem, setItem } from '../../utils'
import setting from '../../config.json'
import { useUser } from '../../context/UserContext'
import { useWebsocket } from '../../context/WebsocketContext'

export const HomePage = (props) => {
  const [theme] = useTheme()
  const [userState, setUser] = useState({ loading: false, error: null, result: null })
  const [, setUserState] = useUser()
  const socket = useWebsocket()
  const [isSocketConnected, setIsSocketConnected] = useState(false)

  const userData = getItem('userdata')

  const goToPLay = async () => {
    try {
      setUser({ ...userState, loading: true })
      const root = setting.socket.url
      const response = await fetch(`${root}/api/bingo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'join'
        })
      })
      const userdata = await response.json()
      setItem('userdata', userdata)
      setUserState(userdata)
      setUser({ ...userState, loading: false, result: userdata })
    } catch (error) {
      setUser({
        ...userState,
        loading: false,
        error
      })
      alert(error)
    }
  }

  useEffect(() => {
    socket.socket.on('connect', () => {
      setIsSocketConnected(!!socket.socket.id)
    })

    const handleSocketEvent = (data) => {
      alert('Please wait, the room is fully!')
    }

    socket.on('game:wait', handleSocketEvent)
    return () => {
      socket.off('game:wait', handleSocketEvent)
    }
  }, [socket])

  return (
    <>
      <DarkBackground />
      <HeroContainer bgimage={theme.images?.general?.homeHero}>
        <ContentWrapper>
          <Title>React Bingo JS</Title>
          <Slogan>Just fun!</Slogan>
          <Button
            color='secundary'
            onClick={goToPLay}
            style={{ color: '#FFF' }}
            disabled={!isSocketConnected}
          >
            {userState.loading ? 'Loading...' : 'Go to play'}
          </Button>
        </ContentWrapper>
      </HeroContainer>
    </>
  )
}
