import React, { useEffect } from 'react'
import { useTheme } from 'ordering-ui'
import { useHistory, Redirect } from 'react-router-dom'
import { SpinnerLoader } from 'ordering-ui'
import {
  HeroContainer,
  ContentWrapper,
  DarkBackground,
  Text
} from './styles'

import { useUser } from '../../context/UserContext'
import { Board } from '../../components/Board'
import { useWebsocket } from '../../context/WebsocketContext'
import { getItem, setItem } from '../../utils'


export const PreGame = (props) => {
  const history = useHistory()
  const [theme] = useTheme()
  const [userState] = useUser()
  const socket = useWebsocket()

  const userData = getItem('userdata')

  const goToPLay = () => history.push('/lobby')

  const isReloaded = getItem('isReloaded')

  const reloadPage = () => {
    setItem('isReloaded', true)
    window.location.reload()
  }

  useEffect(() => {
    const handleSocketEvent = (data) => {
      let timeleft = data;
      const  downloadTimer = setInterval(() => {
        if(timeleft <= 0){
          clearInterval(downloadTimer);
          goToPLay()
          return
        }
        document.getElementById('progressBar').value = 10 - timeleft;
        timeleft -= 1;
      }, 1000);
    }
    socket.on('game:time', handleSocketEvent)
    return () => {
      socket.off('game:time', handleSocketEvent)
    }
  }, [socket])

  useEffect(() => {
    if (!isReloaded) {
      reloadPage()
    }
  }, [])

  return (
    isReloaded ? (
      <>
        <DarkBackground />
        <HeroContainer bgimage={theme.images?.general?.homeHero}>
          <ContentWrapper>
            <Text style={{ marginTop: 25 }}>Hi, this is your board</Text>
            <Board board={userData?.board} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Text>Your game will start briefly</Text>
              <progress value='0' max='10' id='progressBar' style={{ width: '50%' }}></progress>
            </div>
          </ContentWrapper>
        </HeroContainer>
      </>
    ) : (
      <SpinnerLoader />
    )
  )
}
