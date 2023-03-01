// styles
import './App.css'

// components
import Landing from './pages/landing/Landing'
import Chat from './pages/chat/Chat'
import Home from './pages/home/Home'

// services
import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'

// hooks
import { useUser } from './hooks/useUser'

function App() {
  const { currentUser, login } = useUser()

  // check at page load if a user is authenticated
  useEffect(() => {
    login()
  }, [])

  // protect Home route if user is null
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to='/signin' />
    }
    return children
  }

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path='/signin' element={<Landing />} />
        <Route
          path='/chat'
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
