import './App.css'
import Landing from './pages/landing/Landing'
import Chat from './pages/chat/Chat'
import Sidebar from './components/Sidebar'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/chat' element={<Sidebar />} />
      </Routes>
    </Router>
  )
}

export default App
