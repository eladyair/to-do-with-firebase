import React, { Fragment } from 'react';

// Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectToDos } from '../../redux/todo/todo.selectors';

// Components
import ToDoItem from '../../components/todo-item/todo-item';
import ToDoForm from '../../components/todo-form/todo-form';

const ToDosList = ({ todos }) => {
    return (
        <Fragment>
            {todos.map((todo, index) => (
                <ToDoItem key={index} todoDetails={todo} />
            ))}
            <ToDoForm />
        </Fragment>
    );
};

const mapStateToProps = createStructuredSelector({
    todos: selectToDos
});

export default connect(mapStateToProps)(ToDosList);
