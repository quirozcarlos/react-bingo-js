import React, { useState, useEffect } from 'react'
import { Button, useTheme } from 'ordering-ui'
import { useHistory } from 'react-router-dom'
import {
  HeroContainer,
  ContentWrapper,
  DarkBackground
} from './styles'



export const PreGame = (props) => {
  const history = useHistory()
  const [theme] = useTheme()

  const goToPLay = () => history.push('/lobby')

  return (
    <>
      <DarkBackground />
      <HeroContainer bgimage={theme.images?.general?.homeHero}>
        <ContentWrapper>
          <Button
            color='secundary'
            onClick={goToPLay}
            style={{ color: '#FFF' }}
          >
            Start
          </Button>
        </ContentWrapper>
      </HeroContainer>
    </>
  )
}
