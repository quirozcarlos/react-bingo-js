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

export const HomePage = (props) => {
  const history = useHistory()
  const [theme] = useTheme()

  const goToPLay = () => {
    const root = 'localhost'
    const response = await fetch(`${root}/api/bingo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'join'
      })
    })
    const result = await response.json()
    console.log(result);
    history.push('/pregame')
  }

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
          >
            Go to play
          </Button>
        </ContentWrapper>
      </HeroContainer>
    </>
  )
}
