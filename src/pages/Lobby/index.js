import React, { useState, useEffect } from 'react'
import { useTheme, Confirm } from 'ordering-ui'
import { useHistory, Redirect } from 'react-router-dom'
import { useWebsocket } from '../../context/WebsocketContext'

import {
  HeroContainer,
  ContentWrapper,
  DarkBackground,
  Balls,
  Cube,
  CubeH,
  Wrapper,
  BallCounted
} from './styles'
import { Board } from '../../components/Board'
import { getColor, getItem } from '../../utils'
import { useUser } from '../../context/UserContext'

const getNumberColor = (value) => {
  if (value >= 1 && value <= 15) {
    return 0
  }
  if (value >= 16 && value <= 30) {
    return 1
  }
  if (value >= 31 && value <= 45) {
    return 2
  }
  if (value >= 46 && value <= 60) {
    return 3
  }
  if (value >= 61 && value <= 75) {
    return 4
  }
}

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

export const Lobby = (props) => {
  const socket = useWebsocket()
  const [theme] = useTheme()
  // const history = useHistory()
  const [selectedNumbers, setSelectedNumbers] = useState({ values: [] })
  const [userState] = useUser()
  const [currentNumbers, setCurrentNumbers] = useState({ values: [] })
  const [confirm, setConfirm] = useState({ open: false, content: null, handleOnAccept: null })

  const CURRENT = []

  const handleBingoClick = () => {
    socket.join('bingo:callBingo', {
      ...userState,
      boardSelected: selectedNumbers.values
    })
  }

  const handleCubeClick = (value) => {
    if (selectedNumbers.values?.includes(value) || !currentNumbers.values.includes(value)) {
      return
    }
    setSelectedNumbers({
      values: [...selectedNumbers.values, value]
    })
  }

  useEffect(() => {
    const handleSocketEvent = (data) => {
      CURRENT.push(data)
      setCurrentNumbers({ values: CURRENT })
    }

    const handleGameOver = (data) => {
      setConfirm({
        open: true,
        content: data ? `User ${data} is the winner!` : 'There are no winners!',
        handleOnAccept: () => {
          window.localStorage.clear()
          window.location.href = '/'
          setConfirm({ ...confirm, open: false })
        }
      })
    }
    socket.on('bingo:callNumber', handleSocketEvent)
    socket.on('game:over', handleGameOver)
    return () => {
      socket.off('bingo:callNumber', handleSocketEvent)
      socket.off('game:over', handleGameOver)
      socket.leave('bingo:callBingo')
    }
  }, [socket])

  // useEffect(() => {
  //   if (socket.socket.disconnected) {
  //     window.localStorage.clear()
  //     history.push('/')
  //   }
  // }, [socket])

  return (
    <>
      <DarkBackground />
      <HeroContainer bgimage={theme.images?.general?.homeHero}>
        <ContentWrapper>
          <Balls>
            {currentNumbers.values.slice(Math.max(currentNumbers.values.length - 5, 0)).map((value, i) => (
              <BallCounted
                key={i}
                color={getColor(getNumberColor(value))}
                textcolor={'#FFF'}
                isCurrent={i === 4}
              >
                {value}
              </BallCounted>
            ))}
          </Balls>
          <Wrapper>
            <Board
              board={userState?.board}
              selectedNumbers={selectedNumbers}
              handleBingoClick={handleBingoClick}
              handleCubeClick={handleCubeClick}
            />

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
                          color={currentNumbers.values.includes(value) ? 'gray' : 'white'}
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
      <Confirm
        title='Bingo Info'
        content={confirm.content}
        acceptText='Accept'
        open={confirm.open}
        onClose={() => setConfirm({ ...confirm, open: false })}
        onCancel={() => setConfirm({ ...confirm, open: false })}
        onAccept={confirm.handleOnAccept}
        closeOnBackdrop={false}
      />
    </>
  )
}
