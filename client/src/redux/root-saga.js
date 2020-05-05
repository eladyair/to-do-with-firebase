import { all, call } from 'redux-saga/effects';

// Sagas
import { userSagas } from './sagas/user.sagas';
import { todosSagas } from './sagas/todo.sagas';

export default function* rootSaga() {
    yield all([call(userSagas), call(todosSagas)]);
}
