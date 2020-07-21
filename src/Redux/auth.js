import { createAction, handleActions as authReducer } from 'redux-actions';

import { INIT, AUTH_API, SIGN_IN, AUTH_USER_INFO } from 'Constants/api-uri';

const REMOVE_TOKEN_SUCCESS = 'auth/REMOVE_TOKEN_SUCCESS';
const REMOVE_TOKEN_FAIL = 'auth/REMOVE_TOKEN_FAIL';

const SET_TOKEN_SUCCESS = 'auth/SET_TOKEN_SUCCESS';
const SET_TOKEN_FAIL = 'auth/SET_TOKEN_FAIL';

const SIGNOUT_SUCCESS = 'auth/SIGNOUT_SUCCESS';
const SIGNOUT_FAIL = 'auth/SIGNOUT_FAIL';

const GET_USER_SUCCESS = 'auth/GET_USER_SUCCESS';
const GET_USER_FAIL = 'auth/GET_USER_FAIL';

const REMOVE_USER_SUCCESS = 'auth/REMOVE_USER_SUCCESS';
const REMOVE_USER_FAIL = 'auth/REMOVE_USER_FAIL';

const initialState = {
  isLogin: !!localStorage.getItem('token'),
  token: localStorage.getItem('token'),
  user: null,
};

export const removeTokenSuccess = createAction(REMOVE_TOKEN_SUCCESS);
export const removeTokenFail = createAction(REMOVE_TOKEN_FAIL);
export const setTokenSuccess = createAction(SET_TOKEN_SUCCESS); // result.token
export const setTokenFail = createAction(SET_TOKEN_FAIL);
export const signoutSuccess = createAction(SIGNOUT_SUCCESS);
export const signoutFail = createAction(SIGNOUT_FAIL);
export const getUserSuccess = createAction(GET_USER_SUCCESS); // result.userinfo
export const getUserFail = createAction(GET_USER_FAIL);
export const removeUserSuccess = createAction(REMOVE_USER_SUCCESS);
export const removeUserFail = createAction(REMOVE_USER_FAIL);

export default authReducer(
  {
    [REMOVE_TOKEN_SUCCESS]: (state) => {
      return { ...state, isLogin: false, token: null };
    },
    [REMOVE_TOKEN_FAIL]: (state) => {
      return state;
    },
    [SET_TOKEN_SUCCESS]: (state, action) => {
      localStorage.setItem('token', action.payload);
      return { ...state, isLogin: true, token: action.payload };
    },
    [SET_TOKEN_FAIL]: (state) => {
      return state;
    },
    [SIGNOUT_SUCCESS]: (state) => {
      localStorage.removeItem('token');
      return { ...state, isLogin: false, token: null, user: {} };
    },
    [SIGNOUT_FAIL]: (state) => {
      return state;
    },
    [GET_USER_SUCCESS]: (state, action) => {
      return { ...state, user: action.payload };
    },
    [GET_USER_FAIL]: (state) => {
      return state;
    },
    [REMOVE_USER_SUCCESS]: (state) => {
      return { ...state, user: {} };
    },
    [REMOVE_USER_FAIL]: (state) => {
      return state;
    },
  },
  initialState,
);

export const postSignIn = (params) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}${INIT}${AUTH_API}${SIGN_IN}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: params.id,
            password: params.password,
          }),
        },
      );
      if (response.status === 401) {
        await dispatch(removeTokenSuccess());
        return 'failed';
      }
      if (response.status === 403) {
        await dispatch(removeTokenSuccess());
        return 'invalid token';
      }
      const result = await response.json();
      await dispatch(setTokenSuccess(result.token));
      return result.token;
    } catch (error) {
      dispatch(removeTokenSuccess());
      return 'ERROR!';
    }
  };
};

export const getUser = (token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}${INIT}${AUTH_API}${AUTH_USER_INFO}`,
        {
          method: 'GET',
          headers: {
            'x-access-token': token,
          },
        },
      );
      let result;
      switch (response.status) {
        case 200:
          result = await response.json();
          await dispatch(getUserSuccess(result.userInfo));
          return result.userInfo;
        case 403:
          result = await response.json();
          if (result.message === 'jwt expired') {
            await dispatch(removeTokenSuccess());
          }
          if (result.message === 'jwt malformed') {
            await dispatch(removeTokenSuccess());
          }
          return result.message;
        default:
          await dispatch(removeUserSuccess());
          return 'failed';
      }
    } catch (error) {
      dispatch(removeUserSuccess());
      return 'ERROR!';
    }
  };
};

export const signOut = () => {
  return async (dispatch) => {
    await dispatch(signoutSuccess());
  };
};
