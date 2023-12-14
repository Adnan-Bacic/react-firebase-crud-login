import { combineReducers } from 'redux';
import * as reducers from './reducers';

const rootReducer = combineReducers({
  user: reducers.userReducer,
  error: reducers.errorReducer,
  items: reducers.itemsReducer,
  users: reducers.usersReducer,
});

export default rootReducer;
