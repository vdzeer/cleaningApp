import { combineReducers } from 'redux';
import { UserReducer } from './userReducer';

const rootReducer = combineReducers({
  userReducer: UserReducer,
});

export { rootReducer };
