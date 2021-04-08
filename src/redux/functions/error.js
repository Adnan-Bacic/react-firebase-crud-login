import store from '../configureStore';
import * as actions from '../actions';

export const setError = () => {
  store.dispatch(actions.error.setError());
};

export const clearError = () => {
  store.dispatch(actions.error.clearError());
};
