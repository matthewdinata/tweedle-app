// components
import { db } from '../firebase';

// services
import { doc, getDoc } from 'firebase/firestore';

export const useFriendData = () => {
  // function to get the complete friends data from uid
  const getFriendList = async (uid) => {
    const docRef = doc(db, 'friends', uid);
    const docSnap = await getDoc(docRef);
    return docSnap.data().listOfFriends;
  };

  return { getFriendList };
};
