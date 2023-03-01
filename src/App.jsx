import './App.css'
import Landing from './pages/landing/Landing'
import Chat from './pages/chat/Chat'

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import Home from './pages/home/Home'

function App() {
  const { currentUser } = useContext(AuthContext)

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
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </Router>
  )
}

export default App
