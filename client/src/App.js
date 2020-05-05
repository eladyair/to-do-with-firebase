import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { checkUserSession } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

// Styles
import './App.css';

// Components
import Header from './components/header/header';

// Pages
import HomePage from './pages/home/home';
import ToDosPage from './pages/todos/todos';
import SignUpAndSignIn from './pages/sign-up-sign-in/sign-up-sign-in';

const App = ({ currentUser, checkUserSession }) => {
    useEffect(() => {
        checkUserSession();
    }, [checkUserSession]);

    return (
        <div>
            <Header />
            <Switch>
                <Route exact path='/' component={HomePage} />
                <Route exact path='/todos' component={ToDosPage} />
                <Route exact path='/signin' render={() => (currentUser ? <Redirect to='/todos' /> : <SignUpAndSignIn />)} />
            </Switch>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
    checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
