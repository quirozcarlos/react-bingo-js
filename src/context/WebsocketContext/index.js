import React, { createContext, useContext, useEffect, useState } from 'react'
// import { useSession } from '../SessionContext'
import { Socket } from './socket'

/**
 * Create SessionContext
 * This context will manage the socket conection and provide an easy interface
 */
export const WebsocketContext = createContext()

// let socket = null

/**
 * Custom provider to session manager
 * This provider has a reducer for manage session state
 * @param {props} props
 */
export const WebsocketProvider = ({ settings, children }) => {
  const [socket, setSocket] = useState()

  useEffect(() => {
    if (settings.url) {
      const _socket = new Socket(settings)
      setSocket(_socket)
    }
  }, [])

  useEffect(() => {
    if (socket) {
      socket.connect()
      // Get client socket ID
       socket.socket.on('connect', () => {
        console.log('SOCKET CONNECTED', socket.socket.id)
      })
    }
    return () => {
      socket && socket.close()
    }
  }, [socket])

  return (
    <WebsocketContext.Provider value={socket}>
      {children}
    </WebsocketContext.Provider>
  )
}

/**
 * Hook to get and update websocket state
 */
export const useWebsocket = () => {
  const sockerManager = useContext(WebsocketContext)
  return sockerManager || new Socket({})
}
