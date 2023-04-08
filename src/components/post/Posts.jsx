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
      <Post postId='08480fc9-ec06-4d3b-9b83-de4711a8c4f5' />
    </div>
  );
}
