import { createSelector } from 'reselect';

const selectTasks = (state) => state.tasks;

export const selectToDos = createSelector([selectTasks], (tasks) => tasks.todos);

export const selectIsToDosFetching = createSelector([selectTasks], (tasks) => tasks.isFetching);
