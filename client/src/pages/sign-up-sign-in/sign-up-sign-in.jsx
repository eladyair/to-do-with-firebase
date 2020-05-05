import React from 'react';

// Styles
import './sign-up-sign-in.styles.scss';

// Components
import SignUp from '../../components/sign-up/sign-up';
import SignIn from '../../components/sign-in/sign-in';

const SignUpSignIn = () => (
    <div className='sign-up-sign-in-container'>
        <SignIn />
        <SignUp />
    </div>
);

export default SignUpSignIn;
