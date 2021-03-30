import { combineReducers } from 'redux';
import * as reducers from './reducers';

const rootReducer = combineReducers({
  isLoading: reducers.isLoadingReducer,
});

export default rootReducer;
