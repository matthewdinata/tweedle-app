// styles
import './App.css';

// pages
import Landing from './pages/landing/Landing';
import Chat from './pages/chat/Chat';
import Home from './pages/home/Home';
import Edit from './pages/edit/Edit';

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
            <Route
              path='/edit'
              element={<Edit />}
            />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
