// styles
import './App.css';

// components
import Landing from './pages/landing/Landing';
import Chat from './pages/chat/Chat';
import Home from './pages/home/Home';
import Edit from './pages/edit/Edit';

// services
import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import PropTypes from 'prop-types';

// hooks
import { useUser } from './hooks/useUser';

function App() {
  const { currentUser, login } = useUser();

  // check at page load if a user is authenticated
  useEffect(() => {
    login();
  }, []);

  // protect Home route if user is null
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
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
        <Route
          path='/edit'
          element={
            // <ProtectedRoute>
            <Edit />
            // </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
