import { combineReducers } from 'redux';
import * as reducers from './reducers';

const rootReducer = combineReducers({
  isLoading: reducers.isLoadingReducer,
  user: reducers.userReducer,
  error: reducers.errorReducer,
});

export default rootReducer;
