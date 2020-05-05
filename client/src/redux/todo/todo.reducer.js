import { ADD_TO_DO_FAILURE, FETCH_TO_DOS_START, FETCH_TO_DOS_SUCCESS, FETCH_TO_DOS_FAILURE } from '../types';
const INITIAL_STATE = {
    todos: [],
    isFetching: false,
    error: null
};

const todoReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case FETCH_TO_DOS_START:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_TO_DOS_SUCCESS:
            return {
                ...state,
                todos: payload,
                isFetching: false
            };

        case FETCH_TO_DOS_FAILURE:
        case ADD_TO_DO_FAILURE:
            return {
                ...state,
                error: payload
            };
        default:
            return {
                ...state
            };
    }
};

export default todoReducer;
