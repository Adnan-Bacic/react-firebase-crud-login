import store from '../configureStore';
import * as actions from '../actions';

export const setError = (err) => {
  // firebas errors have a .code property. when we throw errors there is no .code property. so we add it manually
  if (!err.code) {
    // eslint-disable-next-line no-param-reassign
    err.code = 'An error occurred';
  }
  store.dispatch(actions.error.setError(err));
};

export const clearError = () => {
  store.dispatch(actions.error.clearError());
};
