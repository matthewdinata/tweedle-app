// styles 
import './App.css'

// components
import Landing from './pages/landing/Landing'
import Home from './pages/home/Home'

// pages
import Landing from './pages/landing/Landing';
import Chat from './pages/chat/Chat';
import Home from './pages/home/Home';

// services
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// components
import ProtectedRoute from './components/ProtectedRoute';
import PersistAuth from './components/PersistAuth';

function App() {
  return (

    <Router>
      <Routes>
        <Route element={<PersistAuth />}>
          <Route
            path='/signin'
            element={<Landing />}
          />
          <Route element={<ProtectedRoute />}>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/chat'
              element={<Chat />}
            />
          </Route>
        </Route>
      </Routes>
    </Router>
  );

}

export default App;
