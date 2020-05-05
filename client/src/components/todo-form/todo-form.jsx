import React, { useState } from 'react';

// Redux
import { connect } from 'react-redux';
import { addToDoStart } from '../../redux/todo/todo.actions';

// Components
import FormInput from '../shared/form-input/form-input';

const ToDoForm = ({ addToDoStart }) => {
    const [todo, setToDo] = useState('');

    const handleChange = (e) => {
        setToDo(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const toDo = {
            todo,
            isCompleted: false
        };
        addToDoStart(toDo);
        setToDo('');
    };

    return (
        <div className='to-do-form'>
            <form onSubmit={handleSubmit}>
                <FormInput type='text' name='displayName' label='Add a new to do task' value={todo} handleChange={handleChange} required />
            </form>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    addToDoStart: (todo) => dispatch(addToDoStart(todo))
});

export default connect(null, mapDispatchToProps)(ToDoForm);
