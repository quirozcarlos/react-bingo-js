import React from 'react'
import styled, { css } from 'styled-components'

export const HeroContainerStyled = styled.div`
  width: calc(100% - 40px);
  height: 100vh;
  padding: 20px;

  button{
    padding-top: 5px;
    padding-bottom: 5px;
  }

  ${({ bgimage }) => bgimage && css`
    background-repeat: no-repeat, repeat;
    background-size: cover;
    object-fit: cover;
    background-position: center;
  `}

  @media (min-width: 821px) {
    height: 100vh;
  }
`

export const HeroContainer = (props) => {
  const style = {}
  if (props.bgimage) {
    style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${props.bgimage})`
  }

  return (
    <HeroContainerStyled {...props} style={style}>
      {props.children}
    </HeroContainerStyled>
  )
}

export const ContentWrapper = styled.div`
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    padding: 0px 20px 0px;

    button {
      width: 180px;
    }

    input {
      width: 90%;
      margin-bottom: 15px;
    }

    @media (min-width: 425px) {
      input {
        width: 97%;
      }
    }

    @media (min-width: 768px) {
      padding: 0px 40px 0px;

      ${props => props.theme?.rtl && css`
        padding: 0px 40px 0px;
      `}
    } */
`


export const DarkBackground = styled.div`
  opacity:0.5;
  background-color: Black;
`
export const Balls = styled.div`
  display: flex;
  justify-content: center;
  & > * {
    margin: 0 5px;
  }
`
export const Cards = styled.div`
  
`

export const Cube = styled.td`
    text-align: center;
    padding: 10px;
    font-size: 20px;
    width: 20px;
    height: 20px;
   ${props => props.color && css`
      background-color: ${props.color};
    `};
    border: #000 1px solid;
  `

export const CubeH = styled.th`
  text-align: center;
  padding: 10px;
  font-size: 20px;
  width: 20px;
  height: 20px;
  ${props => props.color && css`
    background-color: ${props.color};
  `};
  border: #000 1px solid;
  `

export const Table =  styled.table`
  background-color: #FFF;
`

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const BallCounted = styled.div`
  border-radius: 100%;
  text-align: center;
  padding: 20px;
  width: 25px;
  height: 25px;
  font-size: 20px;
  ${props => props.color && css`
    background-color: ${props.color};
  `};
  ${props => props.textcolor && css`
    color: ${props.textcolor};
  `};
`

export const Text = styled.h1`
  margin: 0px;
  text-align: left;
  font: normal normal normal 80px ${props => props.theme.fonts.special?.name || 'Georgia'};
  letter-spacing: 0px;
  color: #FFFFFF;
  text-shadow: 0px 3px 6px #00000029;
  opacity: 1;
  font-size: 35px;
`
