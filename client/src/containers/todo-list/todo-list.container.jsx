// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsToDosFetching } from '../../redux/todo/todo.selectors';

// Components
import WithSpinner from '../../components/with-spinner/with-spinner';
import ToDosList from '../../components/todo-list/todo-list';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsToDosFetching
});

const ToDoListContainer = compose(connect(mapStateToProps), WithSpinner)(ToDosList);

export default ToDoListContainer;
