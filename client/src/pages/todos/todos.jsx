import React, { useEffect, lazy, Suspense } from 'react';

// Styles
import './todos.styles.scss';

// Redux
import { connect } from 'react-redux';
import { fetchToDosStart } from '../../redux/todo/todo.actions';

// Components
import Spinner from '../../components/spinner/spinner';

// Lazy loaded components
const ToDoListContainer = lazy(() => import('../../containers/todo-list/todo-list.container'));

const ToDosPage = ({ fetchToDosStart, todos }) => {
    useEffect(() => {
        fetchToDosStart();
    }, [fetchToDosStart]);

    return (
        <div className='todos-page-container'>
            <h1>My To Do List</h1>
            <div className='todo-list'>
                <Suspense fallback={<Spinner />}>
                    <ToDoListContainer />
                </Suspense>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    fetchToDosStart: () => dispatch(fetchToDosStart())
});

export default connect(null, mapDispatchToProps)(ToDosPage);
