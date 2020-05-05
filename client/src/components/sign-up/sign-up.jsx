import React, { useState } from 'react';

// Styles
import './sign-up.styles.scss';

// Redux
import { connect } from 'react-redux';
import { signUpStart } from '../../redux/user/user.actions';

// Components
import FormInput from '../shared/form-input/form-input';
import CustomButton from '../shared/custom-button/custom-button';

const SignUp = ({ signUpStart }) => {
    const [userDetails, setUserDetails] = useState({ displayName: '', email: '', password: '', confirmPassword: '' });

    const { displayName, email, password, confirmPassword } = userDetails;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUserDetails({ ...userDetails, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Password don't match");
            return;
        }

        signUpStart({ displayName, email, password });
    };

    return (
        <div className='sign-up'>
            <h2 className='title'>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <FormInput type='text' name='displayName' label='Display Name' value={displayName} handleChange={handleChange} required />
                <FormInput type='email' name='email' label='Email' value={email} handleChange={handleChange} required />
                <FormInput type='password' name='password' label='Password' value={password} handleChange={handleChange} required />
                <FormInput
                    type='password'
                    name='confirmPassword'
                    label='Confirm Password'
                    value={confirmPassword}
                    handleChange={handleChange}
                    required
                />
                <CustomButton>Sign Up</CustomButton>
            </form>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    signUpStart: (userDetails) => dispatch(signUpStart(userDetails))
});

export default connect(null, mapDispatchToProps)(SignUp);
