import {
    CHECK_USER_SESSION,
    EMAIL_SIGN_IN_START,
    GOOGLE_SIGN_IN_START,
    FACEBOOK_SIGN_IN_START,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE,
    SIGN_OUT_START,
    SIGN_OUT_SUCCESS,
    SIGN_OUT_FAILURE,
    SIGN_UP_START,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE
} from '../types';

export const checkUserSession = () => ({
    type: CHECK_USER_SESSION
});

export const emailSignInStart = (emailAndPassword) => ({
    type: EMAIL_SIGN_IN_START,
    payload: emailAndPassword
});

export const googleSignInStart = () => ({
    type: GOOGLE_SIGN_IN_START
});

export const facebookSignInStart = () => ({
    type: FACEBOOK_SIGN_IN_START
});

export const signInSuccess = (user) => ({
    type: SIGN_IN_SUCCESS,
    payload: user
});

export const signInFailure = (error) => ({
    type: SIGN_IN_FAILURE,
    payload: error
});

export const signOutStart = () => ({
    type: SIGN_OUT_START
});

export const signOutSuccess = () => ({
    type: SIGN_OUT_SUCCESS
});

export const signOutFailure = () => ({
    type: SIGN_OUT_FAILURE
});

export const signUpStart = (userDetails) => ({
    type: SIGN_UP_START,
    payload: userDetails
});

export const signUpSuccess = ({ user, addionalData }) => ({
    type: SIGN_UP_SUCCESS,
    payload: { user, addionalData }
});

export const signUpFailure = (error) => ({
    type: SIGN_UP_FAILURE,
    payload: error
});
