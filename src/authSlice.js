import { createSlice } from '@reduxjs/toolkit';

import { push } from 'connected-react-router';
import { saveItem, deleteItem } from './services/storage';

import {
  postLogin,
  postGoogleSignIn,
  postSignup,
  postLogout,
} from './services/api';

const initialUser = {
  displayName: '',
  uid: '',
};

const { actions, reducer: authReducer } = createSlice({
  name: 'authentication',
  initialState: {
    loginFields: {
      email: '',
      password: '',
    },
    signupFields: {
      email: '',
      password: '',
    },
    user: {
      ...initialUser,
    },
    error: '',
  },
  reducers: {
    changeLoginField(state, { payload: { name, value } }) {
      return {
        ...state,
        loginFields: {
          ...state.loginFields,
          [name]: value,
        },
      };
    },
    changeSignupField(state, { payload: { name, value } }) {
      return {
        ...state,
        signupFields: {
          ...state.signupFields,
          [name]: value,
        },
      };
    },
    setUser(state, { payload: { displayName, uid } }) {
      return {
        ...state,
        user: {
          displayName,
          uid,
        },
      };
    },
    setError(state, { payload: error }) {
      return {
        ...state,
        error,
      };
    },
    logout(state) {
      return {
        ...state,
        user: {
          ...initialUser,
        },
      };
    },
  },
});

export const {
  changeLoginField,
  changeSignupField,
  setUser,
  setError,
  logout,
} = actions;

export function requestLogin() {
  return async (dispatch, getState) => {
    const { loginFields: { email, password } } = getState();
    try {
      const { user } = await postLogin({ email, password });
      const { displayName, uid } = user;

      dispatch(setUser({ displayName, uid }));
      saveItem('user', { displayName, uid });
      dispatch(push('/'));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
}

export function requestGoogleSignIn() {
  return async (dispatch) => {
    try {
      const { user } = await postGoogleSignIn();
      const { displayName, uid } = user;

      dispatch(setUser({ displayName, uid }));
      saveItem('user', { displayName, uid });
      dispatch(push('/'));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
}

export function requestSignup() {
  return async (dispatch, getState) => {
    const { signupFields: { email, password } } = getState();
    try {
      const { user } = await postSignup({ email, password });
      const { displayName, uid } = user;
      dispatch(setUser({ displayName, uid }));
      saveItem('user', { displayName, uid });
      dispatch(push('/'));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
}

export function requestLogout() {
  return async (dispatch) => {
    await postLogout();
    dispatch(logout());
    deleteItem('user');
  };
}

export default authReducer;