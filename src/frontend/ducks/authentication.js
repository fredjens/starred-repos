/**
 * Dependencies
 */
import { flow } from 'lodash';

/**
 * Feature name
 */
export const NAME = '@@auth';

/**
 * Action types
 */
export const AUTHENICATION_CHECK = `${NAME}/AUTHENICATION_CHECK`;
export const LOGIN_REQUEST = `${NAME}/LOGIN_REQUEST`;
export const LOGIN_SUCCESS = `${NAME}/LOGIN_SUCCESS`;
export const LOGIN_ERROR = `${NAME}/LOGIN_ERROR`;
export const LOGOUT = `${NAME}/LOGOUT`;

/**
 * Initial state
 */
const initialState = {
  isInitiallyLoaded: false,
  initialLoadError: null,
  isLoading: false,
  isLoggingIn: false,
  isAuthenticated: false,
  loginError: null,
  user: {},
};

/**
 * Selectors
 */
export const getState = (state) => state[NAME];
export const getAuthStatus = flow(getState, (state) => state.isAuthenticated);
export const getLoadingStatus = flow(getState, (state) => state.isLoading);
export const getLoginStatus = flow(getState, (state) => state.isLoggingIn);
export const getLoginError = flow(getState, (state) => state.loginError);

/**
 * App Reducer
 */
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_REQUEST:
    return {
      ...state,
      isLoggingIn: true,
      loginError: null,
    };

    case LOGIN_SUCCESS:
    return {
      ...state,
      isLoggingIn: false,
      isAuthenticated: true,
      loginError: null,
      user: action.payload.user,
    };

    case LOGIN_ERROR:
    return {
      ...state,
      isLoggingIn: false,
      isAuthenticated: false,
      loginError: action.error,
    };

    case LOGOUT:
    return {
      ...state,
      isLoggingIn: false,
      isAuthenticated: false,
    };

    default:
    return state;
  }
}

/**
 * Action Creators
 */
export function loginRequest({ username, password, application } = {}) {
  return {
    type: LOGIN_REQUEST,
    username,
    password,
    application,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      user,
    },
  };
}

export function loginError(error) {
  return { type: LOGIN_ERROR, error };
}

export function logout() {
  return { type: LOGOUT };
}

export function checkAuthentication() {
  return { type: AUTHENICATION_CHECK };
}