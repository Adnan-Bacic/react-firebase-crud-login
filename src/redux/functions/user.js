import store from '../configureStore';
import * as actions from '../actions';
import * as errors from './error';
import { auth, firestore } from '../../firebase/config';

export const setUserData = (userData) => {
  store.dispatch(actions.user.setUserData(userData));
};

export const registerUser = async (email, password, name) => {
  try {
    // auth
    await auth().createUserWithEmailAndPassword(email, password);
    // console.log('current user:', auth.currentUser);

    // firestore, set specific id equal to current user
    await firestore().collection('users').doc(auth().currentUser.uid).set({
      email: email,
      name: name,
    });

    return true;
  } catch (err) {
    errors.setError(err);
    return err;
  }
};

export const loginuser = async (email, password) => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
    store.dispatch(actions.user.loginUser());
    return true;
  } catch (err) {
    errors.setError(err);
    return err;
  }
};

export const signOutUser = async () => {
  try {
    await auth().signOut();
    store.dispatch(actions.user.signOutUser());
    return true;
  } catch (err) {
    errors.setError(err);
    return err;
  }
};

// TODO: ERROR WHEN RELOADING
export const getProfileData = async () => {
  try {
    // if people go to the url manually auth().currentUser is null
    const userId = auth()?.currentUser?.uid;

    if (!userId) {
      throw new Error('Invalid query');
    }

    const doc = await firestore().collection('users').doc(userId).get();

    if (!doc.exists) {
      throw new Error('No user info');
    }

    store.dispatch(actions.user.getProfileData(doc.data()));

    return true;
  } catch (err) {
    errors.setError(err);
    return err;
  }
};
