import { combineReducers } from 'redux';

// Reducers
import userReducer from './user/user.reducer';
import todoReducer from './todo/todo.reducer';

const rootReducer = combineReducers({
    user: userReducer,
    tasks: todoReducer
});

export default rootReducer;
