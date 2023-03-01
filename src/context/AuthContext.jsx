import { useEffect, useState, createContext } from 'react'

// firebase
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurretUser] = useState({})

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurretUser(user)
      console.log(user)
    })

    return () => {
      unsub()
    }
  }, [])
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}
