import { FETCH_TO_DOS_START, FETCH_TO_DOS_SUCCESS, FETCH_TO_DOS_FAILURE, ADD_TO_DO, ADD_TO_DO_FAILURE, COMPLETE_TO_DO, DELETE_TO_DO } from '../types';

export const fetchToDosStart = () => ({
    type: FETCH_TO_DOS_START
});

export const fetchToDosSuccess = (todos) => ({
    type: FETCH_TO_DOS_SUCCESS,
    payload: todos
});

export const fetchToDosFailure = (error) => ({
    type: FETCH_TO_DOS_FAILURE,
    payload: error
});

export const addToDoStart = (toDo) => ({
    type: ADD_TO_DO,
    payload: toDo
});

export const addToDoFailure = (error) => ({
    type: ADD_TO_DO_FAILURE,
    payload: error
});

export const completeToDo = (completeDetails) => ({
    type: COMPLETE_TO_DO,
    payload: completeDetails
});

export const deleteToDo = (id) => ({
    type: DELETE_TO_DO,
    payload: id
});
