import { takeLatest, all, call, put } from 'redux-saga/effects';

// Types
import {
    EMAIL_SIGN_IN_START,
    GOOGLE_SIGN_IN_START,
    FACEBOOK_SIGN_IN_START,
    CHECK_USER_SESSION,
    SIGN_OUT_START,
    SIGN_UP_START,
    SIGN_UP_SUCCESS
} from '../types';

// Firebase related
import { auth, googleProvider, facebookProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.util';
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure } from '../user/user.actions';

export function* getSnapshotFromUserAuth(userAuth, addionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, addionalData);
        const userSnapshot = yield userRef.get();

        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot }));
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(EMAIL_SIGN_IN_START, onEmailSignInAsync);
}

export function* onEmailSignInAsync({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(GOOGLE_SIGN_IN_START, onGoogleSignInAsync);
}

export function* onGoogleSignInAsync() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* onFacebookSignInStart() {
    yield takeLatest(FACEBOOK_SIGN_IN_START, onFacebookSignInAsync);
}

export function* onFacebookSignInAsync() {
    try {
        const { user } = yield auth.signInWithPopup(facebookProvider);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* onCheckUserSeesion() {
    yield takeLatest(CHECK_USER_SESSION, isUserAuthenticated);
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) {
            return;
        }

        yield getSnapshotFromUserAuth(userAuth);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* onSignOutStart() {
    yield takeLatest(SIGN_OUT_START, onSignOutAsync);
}

export function* onSignOutAsync() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure());
    }
}

export function* onSignUpStart() {
    yield takeLatest(SIGN_UP_START, onSignUpAsync);
}

export function* onSignUpAsync({ payload: { displayName, email, password } }) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);

        yield put(signUpSuccess({ user, addionalData: { displayName } }));
    } catch (error) {
        yield put(signUpFailure(error));
    }
}

export function* onSignUpSuccess() {
    yield takeLatest(SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* signInAfterSignUp({ payload: { user, addionalData } }) {
    yield getSnapshotFromUserAuth(user, addionalData);
}

export function* userSagas() {
    yield all([
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onCheckUserSeesion),
        call(onEmailSignInStart),
        call(onGoogleSignInStart),
        call(onFacebookSignInStart),
        call(onSignOutStart)
    ]);
}
