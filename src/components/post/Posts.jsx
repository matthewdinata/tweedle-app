import React, { useEffect, useState } from 'react';

// hooks
import { useUser } from '../../hooks/useUser';
import { useUserData } from '../../hooks/useUserData';

// services
import { doc, onSnapshot } from 'firebase/firestore';

// components
import { db } from '../../firebase';
import Post from './Post';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);

  // get complete user data from Firestore Database using useUserData hook
  const [user, setUser] = useState(null);
  const { currentUser } = useUser();
  const { getUserData } = useUserData();
  useEffect(() => {
    const getCompleteUser = async () => {
      const res = await getUserData(currentUser.uid);
      setUser(res);
    };
    getCompleteUser();
  }, []);

  // get list of friends
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'friends', user.uid), (doc) => {
      doc.exists() && setFriends(doc.data().listOfFriends);
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <div>
      <Post />
    </div>
  );
}
