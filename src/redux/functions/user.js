import store from '../configureStore';
import * as actions from '../actions';
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
    store.dispatch(actions.error.setError(err));
    return err;
  }
};

export const loginuser = async (email, password) => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
    store.dispatch(actions.user.loginUser());
  } catch (err) {
    store.dispatch(actions.error.setError(err));
  }
};

export const signOutUser = async () => {
  try {
    await auth().signOut();
    store.dispatch(actions.user.signOutUser());
  } catch (err) {
    store.dispatch(actions.error.setError(err));
  }
};
