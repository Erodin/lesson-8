import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAo2-Abqlfv3mSJnnrdp-7TQOue5WosOcc',
  authDomain: 'crwn-db-93bd8.firebaseapp.com',
  projectId: 'crwn-db-93bd8',
  storageBucket: 'crwn-db-93bd8.appspot.com',
  messagingSenderId: '295759823522',
  appId: '1:295759823522:web:024a7efa738896f41f8dfb',
  measurementId: 'G-97NCHVSC9Z',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error create user', error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
