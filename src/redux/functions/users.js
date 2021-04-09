import store from '../configureStore';
import * as actions from '../actions';
import { auth, firestore } from '../../firebase/config';

export const getAllItemsByUser = async (id, email) => {
  try {
    // if people change the url manually then location.state.id is undefined. and undefined values cannot be use in firebase queries.
    const userId = id;

    if (!userId) {
      throw new Error('Invalid query');
    }

    // first check if userid exists. should only happen if people manually edit the url
    const userRef = await firestore().collection('users').doc(userId).get();

    if (!userRef.exists) {
      throw new Error('This user does not exist');
    }

    // if there is a user
    const ref = firestore().collection('items').where('createdBy', '==', email);

    const data = await ref.get();

    const arr = [];

    if (data.empty) {
      throw new Error('No items for this user');
    }

    data.forEach((doc) => {
      // console.log('doc.data()', doc.data());
      const result = doc.data();
      result.id = doc.id;
      arr.push(result);
    });

    store.dispatch(actions.users.getAllItemsByUser(arr));
  } catch (err) {
    console.error(err);
  }
};

export const getAllUsers = async () => {
  try {
    const ref = firestore().collection('users');

    const arr = [];

    const data = await ref.get();

    if (data.empty) {
      throw new Error('No users');
    }

    data.forEach((doc) => {
      // console.log('doc.data()', doc.data());
      const result = doc.data();
      result.id = doc.id;
      arr.push(result);
    });
    
    store.dispatch(actions.users.getAllUsers(arr));
  } catch (err) {
    console.warn(err);
  }
};
