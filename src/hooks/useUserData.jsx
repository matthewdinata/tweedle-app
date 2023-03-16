// components
import { db } from '../firebase';

// services
import { doc, getDoc } from 'firebase/firestore';

export const useUserData = () => {
  // function to get the complete user data from uid
  const getUserData = async (uid) => {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  };

  return { getUserData };
};
