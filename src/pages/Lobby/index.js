import React from 'react'
import { Button, useTheme } from 'ordering-ui'
import { useHistory } from 'react-router-dom'
import {
  HeroContainer,
  ContentWrapper,
  Title,
  Slogan,
  DarkBackground
} from './styles'

export const Lobby = (props) => {
  const history = useHistory()
  const [theme] = useTheme()

  const goToPLay = () => history.push('/lobby')

  return (
    <>
      <DarkBackground />
      <HeroContainer bgimage={theme.images?.general?.homeHero}>
        <ContentWrapper>
          <Title>Holi c:</Title>
          {/* <Slogan>Just fun!</Slogan>
          <Button
            color='secundary'
            onClick={goToPLay}
            style={{ color: '#FFF' }}
          >
            Go to play
          </Button> */}
        </ContentWrapper>
      </HeroContainer>
    </>
  )
}
