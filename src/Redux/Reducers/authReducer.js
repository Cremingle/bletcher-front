import {
  TOKEN_EXPIRED,
  SUCCEED_TO_SIGNIN,
  FAILED_TO_SIGNIN,
  SUCCEED_TO_GET_USER,
  FAILED_TO_GET_USER,
  SUCCEED_TO_SIGNOUT
} from "../Constants/action-types";

const initialState = {
  isLogin: !!localStorage.getItem("token"),
  token: localStorage.getItem("token"),
  user: null
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case TOKEN_EXPIRED:
      return Object.assign({}, state, {
        isLogin: false,
        token: null
      });
    case SUCCEED_TO_SIGNIN:
      localStorage.setItem("token", action.payload);
      return Object.assign({}, state, {
        isLogin: true,
        token: action.payload
      });
    case FAILED_TO_SIGNIN:
      return Object.assign({}, state, {
        isLogin: false,
        token: null
      });
    case SUCCEED_TO_SIGNOUT:
      localStorage.removeItem("token");
      return Object.assign({}, state, {
        isLogin: false,
        token: null,
        user: {}
      });
    case SUCCEED_TO_GET_USER:
      return Object.assign({}, state, {
        user: action.payload
      });
    case FAILED_TO_GET_USER:
      return Object.assign({}, state, {
        user: {}
      });

    default:
      return state;
  }
}