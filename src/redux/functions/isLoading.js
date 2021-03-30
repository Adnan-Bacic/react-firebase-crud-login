import store from '../configureStore';
import * as actions from '../actions';

export const setIsLoading = (isLoading) => {
  store.dispatch(actions.isLoading.setIsLoading(isLoading));
};
