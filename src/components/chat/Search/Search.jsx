import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import { useAuth } from '../../../hooks/useAuth';

// styles
import './Search.css';

// components
import UserList from '../UserList';

// firebase
import {
  collection,
  getDoc,
  getDocs,
  doc,
  query,
  setDoc,
  where,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../../firebase';

export default function Search() {
  const [usernameSearched, setUsernameSearched] = useState();
  const [userSearched, setUserSearched] = useState();
  const [loading, setLoading] = useState();
  const [showSearchResult, setShowSearchResult] = useState(false);
  const { currentUid, currentUserInfo } = useAuth();

  const handleKey = (e) => {
    if (e.code === 'Enter') {
      setUserSearched(null);
      if (usernameSearched) {
        handleSearch();
      } else {
        setShowSearchResult(false);
      }
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    const q = query(
      collection(db, 'users'),
      where('username', '==', usernameSearched),
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserSearched(doc.data());
      });
    } catch (error) {
      setUserSearched(null);
      console.log(error.messages);
    }
    setLoading(false);
    setShowSearchResult(true);
  };

  const handleSelect = async () => {
    // check whether current user and seleted user's chat exist
    const combinedId =
      currentUid > userSearched.uid
        ? currentUid + userSearched.uid
        : userSearched.uid + currentUid;
    try {
      const res = await getDoc(doc(db, 'chats', combinedId));

      if (!res.exists()) {
        // create new chats, if doesn't exist
        await setDoc(doc(db, 'chats', combinedId), {
          messages: [],
        });

        // add user to current user's chat list
        console.log(currentUserInfo);
        await updateDoc(doc(db, 'userChats', currentUid), {
          [combinedId + '.userId']: userSearched.uid,
          [combinedId + '.date']: serverTimestamp(),
        });

        // add current user to user's chat list
        await updateDoc(doc(db, 'userChats', userSearched.uid), {
          [combinedId + '.userId']: currentUid,
          [combinedId + '.date']: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
    }
    setUserSearched(null);
    setUsernameSearched('');
    setShowSearchResult(false);
  };

  return (
    <>
      <div className='search'>
        <label className='relative block'>
          <span className='absolute inset-y-0 left-0 flex items-center pl-6 pt-8'>
            <FiSearch
              color='#FFFFFF'
              size={'1.5rem'}
              className='opacity-50'
            />
          </span>
        </label>
        <input
          type='text'
          placeholder='Search chats..'
          className='search-input'
          onKeyDown={handleKey}
          onChange={(e) => setUsernameSearched(e.target.value.trim())}
          value={usernameSearched || ''}
        />
      </div>
      {loading && (
        <p className='text-white text-opacity-50 mx-auto block align-middle mb-3'>
          Loading friends...
        </p>
      )}
      {!loading && showSearchResult && (
        <div className='flex flex-col gap-y-5 w-80 mb-4'>
          {!userSearched && (
            <p className='text-white text-opacity-50 mx-auto block align-middle'>
              No user found in friend list
            </p>
          )}
          {userSearched && (
            <>
              <div
                className='flex flex-col'
                onClick={handleSelect}
              >
                <UserList
                  username={userSearched.username}
                  displayName={userSearched.displayName}
                  photoURL={userSearched.profilePic}
                />
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
