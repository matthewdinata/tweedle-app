// styles
import './App.css';

// components
import Landing from './pages/landing/Landing';
import Chat from './pages/chat/Chat';
import Home from './pages/home/Home';

// services
import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from './hooks/useAuth';

// hooks

function App() {
  const { currentUid, login } = useAuth();

  // check at page load if a user is authenticated
  useEffect(() => {
    login();
  }, []);

  // protect Home route if user is null
  const ProtectedRoute = ({ children }) => {
    if (!currentUid) {
      return <Navigate to='/signin' />;
    }
    return children;
  };
  ProtectedRoute.propTypes = {
    children: PropTypes.element,
  };

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
        <Route
          path='/signin'
          element={<Landing />}
        />
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
  );
}

export default App;
