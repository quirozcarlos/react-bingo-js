import React, { createContext, useState, useContext } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [state, setState] = useState({})

  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const userManager = useContext(UserContext)
  return userManager || [{}, () => {}]
}
