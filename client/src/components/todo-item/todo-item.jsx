import React from 'react';

// Redux
import { connect } from 'react-redux';
import { completeToDo, deleteToDo } from '../../redux/todo/todo.actions';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';

// Styles
import './todo-item.styles.scss';

const ToDoItem = ({ currentUser, todoDetails, completeToDo, deleteToDo }) => {
    const { id, todo, isCompleted } = todoDetails;

    const handleCompleteToDo = (e) => {
        const { id } = e.target;

        const completeDetails = {
            id,
            isComplete: true
        };

        completeToDo(completeDetails);
    };

    const handleDeleteToDo = (e) => {
        let id = null;
        if (e.target.tagName.toLowerCase() === 'i') {
            id = e.target.parentElement.id;
        } else {
            id = e.target.id;
        }

        deleteToDo(id);
    };

    return (
        <div className='todo'>
            <span style={{ textDecoration: isCompleted ? 'line-through' : '' }}>{todo}</span>
            {currentUser ? (
                <div className={isCompleted ? 'button' : 'buttons'}>
                    {isCompleted ? null : (
                        <button className='btn btn-success' id={id} onClick={handleCompleteToDo}>
                            Complete
                        </button>
                    )}

                    <button className='btn btn-danger' id={id} onClick={handleDeleteToDo}>
                        <i className='fa fa-close'></i>
                    </button>
                </div>
            ) : null}
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
    completeToDo: (completeDetails) => dispatch(completeToDo(completeDetails)),
    deleteToDo: (todoID) => dispatch(deleteToDo(todoID))
});

export default connect(mapStateToProps, mapDispatchToProps)(ToDoItem);
