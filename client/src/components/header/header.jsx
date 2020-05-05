import React from 'react';
import { Link } from 'react-router-dom';

import './header.styles.scss';

// Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { signOutStart } from '../../redux/user/user.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';

const Header = ({ currentUser, signOutStart }) => (
    <div className='header-container'>
        <Link to='/' className='logo-container'>
            <div className='logo'></div>
        </Link>
        <div className='header-links'>
            <Link className='header-link' to='/todos'>
                TO DOs
            </Link>
            {currentUser ? (
                <div className='header-link' onClick={signOutStart}>
                    SIGN OUT
                </div>
            ) : (
                <Link className='header-link' to='/signin'>
                    SIGN IN
                </Link>
            )}
        </div>
    </div>
);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
    signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
