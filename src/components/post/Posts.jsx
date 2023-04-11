import React, { useEffect, useState } from 'react';

// hooks
import { useAuth } from '../../hooks/useAuth';
import { useFriendData } from '../../hooks/useFriendData';

// components
import Post from './Post';

// firebase
import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export default function Posts() {
  const { currentUid } = useAuth();
  const { getFriendList } = useFriendData();
  const [friendPosts, setFriendPosts] = useState([]);

  let posts = [];

  const fetchFriendPost = async (uid) => {
    const resultArray = await getFriendList(uid);
    resultArray.push(currentUid);

    const q = query(
      collection(db, 'posts'),
      where('posterId', 'in', resultArray),
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (!posts.includes(doc.data().id)) {
        posts.push(doc.data().id);
      }
    });
    setFriendPosts(posts);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      await fetchFriendPost(currentUid);
    };
    fetchPosts();
  }, []);

  return friendPosts?.map((id) => {
    return (
      <div key={id}>
        <Post postId={id} />
      </div>
    );
  });
}
