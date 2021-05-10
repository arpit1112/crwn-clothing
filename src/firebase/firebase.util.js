import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBuzOlzxyhJ6_6GHGamdStpA4yjuYp6dQU",
    authDomain: "crwn-db-a0099.firebaseapp.com",
    projectId: "crwn-db-a0099",
    storageBucket: "crwn-db-a0099.appspot.com",
    messagingSenderId: "763654333390",
    appId: "1:763654333390:web:d5891d721107e90119419f",
    measurementId: "G-KTFJ4CTB5D"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('Error Creating User', error.message);
        }
    }

    return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
