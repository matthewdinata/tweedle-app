import React, { useEffect } from 'react';

// hooks
import { useAuth } from '../../hooks/useAuth';
import { useFriends } from '../../hooks/useFriends';

// components
import Post from './Post';

export default function Posts() {
  const { currentUid } = useAuth();

  const { getFriendList, userFriends } = useFriends();
  useEffect(() => {
    getFriendList(currentUid);
  }, []);
  console.log(userFriends);

  return (
    <div>
      <Post postId='19da81af-4989-49d6-9824-ddca1e4e2240' />
    </div>
  );
}
