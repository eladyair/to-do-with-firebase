import { takeLatest, all, call, put } from 'redux-saga/effects';

// Redux
import { FETCH_TO_DOS_START, ADD_TO_DO, COMPLETE_TO_DO, DELETE_TO_DO } from '../types';
import { fetchToDosSuccess, fetchToDosFailure, addToDoFailure } from '../todo/todo.actions';

// Firebase related
import { firestore, convertToDosSnapshotToMap, createToDoDocument, updateToDoDocument, deleteToDoDocument } from '../../firebase/firebase.util';

export function* onFetchToDosStart() {
    yield takeLatest(FETCH_TO_DOS_START, fetchToDosAsync);
}

export function* fetchToDosAsync() {
    try {
        const todosRef = firestore.collection('todos').orderBy('createdAt', 'asc');

        const snapshot = yield todosRef.get();
        const todosMap = yield call(convertToDosSnapshotToMap, snapshot);

        // put: acts like dispatch
        yield put(fetchToDosSuccess(todosMap));
    } catch (error) {
        yield put(fetchToDosFailure(error.message));
    }
}

export function* onAddToDoStart() {
    yield takeLatest(ADD_TO_DO, onAddToDoAsync);
}

export function* onAddToDoAsync({ payload }) {
    try {
        yield call(createToDoDocument, payload);
        yield fetchToDosAsync();
    } catch (error) {
        yield put(addToDoFailure(error));
    }
}

export function* onCompleteoDoStart() {
    yield takeLatest(COMPLETE_TO_DO, onCompleteDoAsync);
}

export function* onCompleteDoAsync({ payload }) {
    try {
        yield call(updateToDoDocument, payload);
        yield fetchToDosAsync();
    } catch (error) {
        yield put(addToDoFailure(error));
    }
}

export function* onDeleteoDoStart() {
    yield takeLatest(DELETE_TO_DO, onDeleteDoAsync);
}

export function* onDeleteDoAsync({ payload }) {
    try {
        yield call(deleteToDoDocument, payload);
        yield fetchToDosAsync();
    } catch (error) {
        yield put(addToDoFailure(error));
    }
}

export function* todosSagas() {
    yield all([call(onFetchToDosStart), call(onAddToDoStart), call(onCompleteoDoStart), call(onDeleteoDoStart)]);
}
