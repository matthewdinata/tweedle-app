import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function PersistAuth() {
  const [loading, setLoading] = useState(true);
  const { login, logout } = useAuth();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        login(user.uid);
        console.log('logged in');
      } else {
        logout();
        console.log('logged out');
      }
      setLoading(false);
    });
    unsub();
  }, []);
  return loading ? <p>Loading...</p> : <Outlet />;
}
