import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// firebase
import { db } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

// assets
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

// hooks
import { useUserData } from '../../hooks/useUserData';
import { useAuth } from '../../hooks/useAuth';

// services
import moment from 'moment/moment.js';

export default function Post({ postId }) {
  const [post, setPost] = useState(null);
  const [poster, setPoster] = useState(null);
  const [relativeTimePosted, setRelativeTimePosted] = useState('');
  const [loading, setLoading] = useState(false);
  const [likes, setLikes] = useState(null);
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const { getUserData } = useUserData();
  const { currentUid } = useAuth();

  // get specific post
  const getPost = async (postId) => {
    const docRef = doc(db, 'posts', postId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  };

  // get array of uid in likes document
  const getLikes = async () => {
    const res = await getDoc(doc(db, 'likes', postId));
    setLikes(res.data().listOfLikes);
  };

  const addLike = async () => {
    setButtonIsDisabled(true);
    try {
      await updateDoc(doc(db, 'likes', postId), {
        noOfLikes: likes.length + 1,
        listOfLikes: likes.concat([currentUid]),
      });
      if (currentUid) {
        setLikes((prev) => (prev ? [...prev, currentUid] : [currentUid]));
      }
    } catch (err) {
      console.log(err);
    }
    setButtonIsDisabled(false);
  };

  const removeLike = async () => {
    setButtonIsDisabled(true);
    try {
      await updateDoc(doc(db, 'likes', postId), {
        noOfLikes: likes.length - 1,
        listOfLikes: likes.filter((id) => id !== currentUid),
      });
      if (currentUid) {
        setLikes((prev) => prev && prev.filter((uid) => uid !== currentUid));
      }
    } catch (err) {
      console.log(err);
    }
    setButtonIsDisabled(false);
  };

  // check if user has liked
  const hasUserLiked = likes?.find((id) => id === currentUid);

  useEffect(() => {
    setLoading(true);
    const initiatePost = async () => {
      const postResponse = await getPost(postId);
      setPost(postResponse);
      setRelativeTimePosted(moment(postResponse.date.toDate()).fromNow());

      const posterResponse = await getUserData(postResponse.posterId);
      setPoster(posterResponse);
    };
    initiatePost();
    getLikes();
    setLoading(false);
  }, []);

  return (
    !loading && (
      <div className='posts w-[680px] h-auto bg-black-100 rounded-lg p-6 flex flex-col gap-4'>
        {poster && (
          <div className='posts__container flex justify-between items-start'>
            <div className='flex'>
              <img
                className='bg-black rounded-full w-10 h-10 object-cover'
                src={poster.profilePic}
              ></img>

              <div className='container__profile flex flex-col items-start ml-5 justify-center'>
                <span className='text-white my-[-4px] font-medium text-base'>
                  {poster.displayName}
                </span>
                <span className='text-white font-light text-xs'>
                  @{poster.username}
                </span>
              </div>
            </div>
            <span className='text-white text-opacity-50 text-xs'>
              {relativeTimePosted}
            </span>
          </div>
        )}
        <div className='posts__container overflow-hidden flex flex-col gap-4'>
          <span className='text-white text-sm'>{post?.text}</span>
          {post?.img && (
            <div className='container__img rounded-lg max-h-96 max-w-full'>
              <img
                src={post.img}
                alt=''
                className='rounded-lg object-contain max-h-96 max-w-full'
              />
            </div>
          )}
        </div>
        <div className='posts__likes flex justify-end text-white text-sm text-opacity-75 font-medium items-center gap-2'>
          <span>{likes?.length || '0'}</span>
          <button
            className='text-xl'
            onClick={hasUserLiked ? removeLike : addLike}
            disabled={buttonIsDisabled}
          >
            {hasUserLiked ? <FaHeart className='text-red' /> : <FiHeart />}
          </button>
        </div>
      </div>
    )
  );
}

Post.propTypes = {
  postId: PropTypes.string.isRequired,
};
