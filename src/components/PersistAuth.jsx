import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Loading from './Loading';

export default function PersistAuth() {
  const [loading, setLoading] = useState(true);
  const { login, logout } = useAuth();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        login(user.uid);
      } else {
        logout();
      }
      setLoading(false);
    });
    unsub();
  }, []);
  return loading ? <Loading /> : <Outlet />;
}
