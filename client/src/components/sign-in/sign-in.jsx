import React, { useState } from 'react';

// Styles
import './sign-in.styles.scss';

// Redux
import { connect } from 'react-redux';
import { emailSignInStart, googleSignInStart, facebookSignInStart } from '../../redux/user/user.actions';

// Components
import FormInput from '../shared/form-input/form-input';
import CustomButton from '../shared/custom-button/custom-button';

const SignIn = ({ emailSignInStart, googleSignInStart, facebookSignInStart }) => {
    const [loginDetails, setLoginDetails] = useState({ email: '', password: '' });

    const { email, password } = loginDetails;

    const handleChange = (e) => {
        const { value, name } = e.target;

        setLoginDetails({ ...loginDetails, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailSignInStart(email, password);
    };

    return (
        <div className='sign-in'>
            <h2 className='title'>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <FormInput type='email' name='email' label='Email' value={email} handleChange={handleChange} required />
                <FormInput type='password' name='password' label='Password' value={password} handleChange={handleChange} required />
                <div className='buttons'>
                    <CustomButton type='submit'>Sign In</CustomButton>
                    <CustomButton type='button' socialLogin='google' onClick={googleSignInStart}>
                        Sign In With Google
                    </CustomButton>
                    <CustomButton type='button' socialLogin='facebook' onClick={facebookSignInStart}>
                        Sign In With Facebook
                    </CustomButton>
                </div>
            </form>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password })),
    googleSignInStart: () => dispatch(googleSignInStart()),
    facebookSignInStart: () => dispatch(facebookSignInStart())
});

export default connect(null, mapDispatchToProps)(SignIn);
