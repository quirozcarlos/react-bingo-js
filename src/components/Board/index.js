import React from 'react'
import { Button } from 'ordering-ui'

import {
  Cards,
  Cube,
  CubeH,
  Table,
} from '../../pages/Lobby/styles'

import { getColor } from '../../utils'
import { Text } from '../Text'

export const Board = (props) => {
  const {
    board,
    selectedNumbers,
    handleCubeClick,
    handleBingoClick
  } = props

  return (
    <div>
      {board ? (
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
              {board && board.map((row, i) => (
                <tr key={i}>
                  {row.map((value) => (
                    <Cube
                      key={value}
                      style={{ cursor: 'pointer' }}
                      color={selectedNumbers?.values?.includes(value) ? 'gray' : 'white'}
                      onClick={() => handleCubeClick && handleCubeClick(value)}
                    >
                      {value === 0 ? '*' : value}
                    </Cube>
                  ))}
                </tr>
              ))}
            </tbody>
            {handleBingoClick && (
              <tfoot>
                <tr>
                  <td colSpan={5}>
                    <Button
                      color='primary'
                      onClick={handleBingoClick}
                      style={{ width: '100%', borderRadius: 0 }}
                    >
                      Say Bingo!
                    </Button>
                  </td>
                </tr>
              </tfoot>
            )}
          </Table>
        </Cards>
      ) : (
        <Text>
          Something is wrong!
        </Text>
      )}
    </div>
  )
}
