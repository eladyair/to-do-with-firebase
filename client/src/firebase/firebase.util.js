import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: 'AIzaSyCu7omHYIzl0YGHfrwqxRT-IcSlFJrw6ak',
    authDomain: 'my-to-do-90e23.firebaseapp.com',
    databaseURL: 'https://my-to-do-90e23.firebaseio.com',
    projectId: 'my-to-do-90e23',
    storageBucket: 'my-to-do-90e23.appspot.com',
    messagingSenderId: '45047165372',
    appId: '1:45047165372:web:a5a3601e3d29d3cd313bb9'
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export const facebookProvider = new firebase.auth.FacebookAuthProvider();
facebookProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithFacebook = () => auth.signInWithPopup(facebookProvider);

// Exporting a fuction that will add the user that signed in using google to the database
export const createUserProfileDocument = async (userAuth, additionalData) => {
    try {
        // If no such user
        if (!userAuth) {
            return;
        }

        // Get a user reference from firestore(database) using the userAuth user id (google authentication user id)
        const userRef = firestore.doc(`users/${userAuth.uid}`);

        // Getting this user details from firestore(database)
        const userSnapShot = await userRef.get();

        // If this user doesn't exist, we add it to firestore(database)
        if (!userSnapShot.exists) {
            // Getting the name and email and creating a timestamp
            const { email } = userAuth;
            const { displayName } = additionalData;
            const createdAt = new Date();

            try {
                // Saving this user to the database
                await userRef.set({
                    displayName,
                    email,
                    createdAt,
                    ...additionalData
                });
            } catch (err) {
                console.log('Error - creating user failed: ', err.message);
            }
        }

        return userRef;
    } catch (err) {
        console.log(err);
    }
};

export const convertToDosSnapshotToMap = (todos) => {
    const transformedToDos = todos.docs.map((doc) => {
        const { todo, isCompleted } = doc.data();

        return {
            id: doc.id,
            todo,
            isCompleted
        };
    });

    return transformedToDos;
};

export const createToDoDocument = async (todoDetails) => {
    try {
        const todosRef = firestore.collection('todos');

        if (todoDetails) {
            const createdAt = new Date();

            try {
                const batch = firestore.batch();
                const newDocRef = todosRef.doc();

                batch.set(newDocRef, { ...todoDetails, createdAt });
                // Saving a new to do to the firestore todos collection
                return await batch.commit();
            } catch (err) {
                console.log('Error creating user', err.message);
            }
        }
    } catch (error) {
        console.log('Error creating a to do item', error.message);
    }
};

export const updateToDoDocument = async (todoDetails) => {
    try {
        const todosRef = firestore.collection('todos').doc(todoDetails.id);

        if (todoDetails) {
            await todosRef.update({
                isCompleted: todoDetails.isComplete
            });
        }
    } catch (error) {
        console.log('Error - updating the complete status failed: ', error.message);
    }
};

export const deleteToDoDocument = async (id) => {
    try {
        if (id) {
            const todosRef = firestore.collection('todos').doc(id);

            await todosRef.delete();
        }
    } catch (error) {
        console.log('Error - deleting failed: ', error.message);
    }
};

// Retrieving the current user who is logged in or null if there isn't one
export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged((userAuth) => {
            unsubscribe();
            resolve(userAuth);
        }, reject);
    });
};

export default firebase;
