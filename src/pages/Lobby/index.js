import React, { useState, useEffect } from 'react'
import { Button, useTheme } from 'ordering-ui'
import { useHistory } from 'react-router-dom'
import { useWebsocket } from '../../context/WebsocketContext'

import {
  HeroContainer,
  ContentWrapper,
  DarkBackground,
  Balls,
  Cards,
  Cube,
  CubeH,
  Table,
  Wrapper,
  BallCounted
} from './styles'

const NUMBERS_LIST = [
  [1,16,31,46,61],
  [2,17,32,47,62],
  [3,18,33,48,63],
  [4,19,34,49,64],
  [5,20,35,50,65],
  [6,21,36,51,66],
  [7,22,37,52,67],
  [8,23,38,53,68],
  [9,24,39,54,69],
  [10,25,40,55,70],
  [11,26,41,56,71],
  [12,27,42,57,72],
  [13,28,43,58,73],
  [14,29,44,59,74],
  [15,30,45,60,75],
]
const CARD_DEFAULT = [[6,19,31,49,64],[8,22,32,52,68],[9,23,0,56,70],[12,25,36,57,73],[13,27,45,58,74]]
const CURRENT_NUMBERS = [55,43,30,22,12]

const getColor = (value) => {
  const colors = {
    0: '#E83D2A',
    1: '#FF9602',
    2: '#CA4495',
    3: '#2D823F',
    4: '#3B6DCE'
  }

  return colors[value]
}

export const Lobby = (props) => {
  const socket = useWebsocket()
  const history = useHistory()
  const [theme] = useTheme()
  const [selectedNumbers, setSelectedNumbers] = useState({ values: [] })

  const handleBingoClick = () => {
    // alert('Wrong bingo!')
    console.log(selectedNumbers);
  }

  const handleCubeClick = (value) => {
    if (selectedNumbers.values.includes(value) || !CURRENT_NUMBERS.includes(value)) {
      return
    }
    setSelectedNumbers({
      values: [...selectedNumbers.values, value]
    })
  }

  useEffect(() => {
    const handleSocketEvent = (data) => {
      console.log(data);
    }
    // listen events
    socket.on('#channel', handleSocketEvent)
    return () => {
      socket.off('#channel', handleSocketEvent)
    }
  }, [socket])

  useEffect(() => {
    // emit event
    socket.join('#channel')
    return () => {
      socket.leave('#channel')
    }
  }, [socket])

  return (
    <>
      <DarkBackground />
      <HeroContainer bgimage={theme.images?.general?.homeHero}>
        <ContentWrapper>
          <Balls>
            {CURRENT_NUMBERS.map((value, i) => (
              <BallCounted
                key={i}
                color={getColor(i)}
                textcolor={'#FFF'}
              >
                {value}
              </BallCounted>
            ))}
          </Balls>
          <Wrapper>
            <div>
              <Cards>
                <Table>
                  <thead>
                    <tr>
                      <CubeH color={getColor(0)}>B</CubeH>
                      <CubeH color={getColor(1)}>I</CubeH>
                      <CubeH color={getColor(2)}>N</CubeH>
                      <CubeH color={getColor(3)}>G</CubeH>
                      <CubeH color={getColor(4)}>O</CubeH>
                    </tr>
                  </thead>
                  <tbody>
                    {CARD_DEFAULT.map((row, i) => (
                      <tr key={i}>
                        {row.map((value) => (
                          <Cube
                            key={value}
                            style={{ cursor: 'pointer' }}
                            color={selectedNumbers.values.includes(value) ? 'gray' : 'white'}
                            onClick={() => handleCubeClick(value)}
                          >
                            {value === 0 ? '*' : value}
                          </Cube>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={5}>
                        <Button
                          color='primary'
                          onClick={handleBingoClick}
                          style={{ width: '100%', borderRadius: 0 }}
                        >
                          BINGO!
                        </Button>
                      </td>
                    </tr>
                  </tfoot>
                </Table>
              </Cards>
            </div>

            <div>
              <table>
                <thead>
                  <tr>
                    <CubeH color='#E83D2A'>B</CubeH>
                    <CubeH color='#FF9602'>I</CubeH>
                    <CubeH color='#CA4495'>N</CubeH>
                    <CubeH color='#2D823F'>G</CubeH>
                    <CubeH color='#3B6DCE'>O</CubeH>
                  </tr>
                </thead>
                <tbody>
                  {NUMBERS_LIST.map((array, i) => (
                    <tr key={i}>
                      {array.map((value) => (
                        <Cube
                          key={value}
                          // style={{ cursor: 'pointer' }}
                          style={{ padding:0, fontSize:15, width: 15, height:15 }}
                          color={CURRENT_NUMBERS.includes(value) ? 'gray' : 'white'}
                        >
                          {value}
                        </Cube>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Wrapper>
        </ContentWrapper>
      </HeroContainer>
    </>
  )
}
