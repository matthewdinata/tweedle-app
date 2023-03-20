import React, { useEffect, useState } from 'react';

// hooks
import { useAuth } from '../../hooks/useAuth';

// services
import { doc, onSnapshot } from 'firebase/firestore';

// components
import { db } from '../../firebase';
import Post from './Post';

export default function Posts() {
  const [friends, setFriends] = useState([]);
  const { currentUid } = useAuth();

  // get list of friends
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'friends', currentUid), (doc) => {
      doc.exists() && setFriends(doc.data().listOfFriends);
    });
    return () => {
      unsub();
    };
  }, []);
  console.log(friends);

  return (
    <div>
      <Post />
    </div>
  );
}
