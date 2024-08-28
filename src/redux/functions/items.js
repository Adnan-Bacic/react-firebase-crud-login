import store from '../configureStore';
import * as actions from '../actions';
import { auth, firestore } from '../../firebase/config';
import * as errors from './error';

export const getAllItems = async () => {
  try {
    const ref = firestore().collection('items');
  
    const arr = [];

    const data = await ref.get();

    if (data.empty) {
      throw new Error('No data to show');
    }

    data.forEach((doc) => {
      const result = doc.data();
      result.id = doc.id;
      arr.push(result);
    });

    store.dispatch(actions.items.getAllItems(arr));

    return true;
  } catch (err) {
    errors.setError(err);
    return err;
  }
};

export const getSingleItem = async (id) => {
  try {
    const ref = firestore().collection('items').doc(id);

    const doc = await ref.get();

    if (!doc.exists) {
      throw new Error('No item with this id');
    }

    store.dispatch(actions.items.getSingleItem(doc.data()));
    return doc.data();
  } catch (err) {
    errors.setError(err);
    return err;
  }
};

export const addItem = async (title, subtitle, body, createdBy) => {
  try {
    const ref = firestore().collection('items');

    const item = {
      title: title,
      subtitle: subtitle,
      body: body,
      createdBy: createdBy,
    };
  
    const createdItem = await ref.add(item);

    const itemWithCreatedItemId = {
      ...item,
      id: createdItem.id,
    };

    store.dispatch(actions.items.addItem(itemWithCreatedItemId));

    return true;
  } catch (err) {
    errors.setError(err);
    return err;
  }
};

export const deleteItem = async (id, createdBy) => {
  try {
    if (auth()?.currentUser?.email !== createdBy) {
      throw new Error('You cannot delete other peoples posts');
    }
  
    const ref = firestore().collection('items');
      
    await ref.doc(id).delete();

    store.dispatch(actions.items.deleteItem(id));

    return true;
  } catch (err) {
    errors.setError(err);
    return err;
  }
};

export const editItem = async (id, title, subtitle, body, createdBy) => {
  try {
    if (auth()?.currentUser?.email !== createdBy) {
      throw new Error('You cannot edit other peoples posts');
    }

    const ref = firestore().collection('items').doc(id);

    const item = {
      title: title,
      subtitle: subtitle,
      body: body,
    };
  
    await ref.update(item);

    store.dispatch(actions.items.editItem(item));

    return true;
  } catch (err) {
    errors.setError(err);
    return err;
  }
};
