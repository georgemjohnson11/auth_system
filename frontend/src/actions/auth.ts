import React from 'react';
import axios from 'axios';
import * as constants from './types';

import { ThunkDispatch as Dispatch } from "redux-thunk";

export type AuthenticationAction = IAuthenticate | IUnauthenticate;

export const load_user = () => async (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }; 

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);
            return async (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
                dispatch({
                    type: constants.USER_LOAD_SUCCESS,
                    payload: res.data
                });
            }
        } catch (err) {
            return async (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
                dispatch({
                    type: constants.USER_LOAD_FAIL
                });
            }
        }
    } else {
        return async (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
            dispatch({
                type: constants.USER_LOAD_FAIL
            });
        }
    }
};

export const googleAuthenticate = (state: string, code: string) => async (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
    if (state && code && !localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const details = {
            'state': state,
            'code': code
        };

        const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?${formBody}`, config);
            return async (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
                dispatch({
                    type: constants.GOOGLE_AUTH_SUCCESS,
                    payload: res.data
                });
                dispatch(load_user());
            }
        } catch (err) {
            return async (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
                dispatch({
                    type: constants.GOOGLE_AUTH_FAIL
                });
            }
        }
    }
};

export const facebookAuthenticate = (state: string, code: string) => async (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
    if (state && code && !localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const details = {
            'state': state,
            'code': code
        };

        const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/o/facebook/?${formBody}`, config);
            return async (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
                dispatch({
                    type: constants.FACEBOOK_AUTH_SUCCESS,
                    payload: res.data
                });
                dispatch(load_user());
            }
        } catch (err) {
            return async (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
                dispatch({
                    type: constants.FACEBOOK_AUTH_FAIL
                });
            }
        }
    }
};

export const checkAuthenticated = () => async (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }; 

        const body = JSON.stringify({ token: localStorage.getItem('access') });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config)

            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: constants.AUTH_SUCCESS
                });
            } else {
                dispatch({
                    type: constants.AUTH_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: constants.AUTH_FAIL
            });
        }

    } else {
        dispatch({
            type: constants.AUTH_FAIL
        });
    }
};

export interface IAuthenticate {
    type: constants.LOGIN_SUCCESS;
  }
  
    
export const login = (email: string, password: string) => async (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);

        return async (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
            await window.localStorage.setItem("authenticated", "true");
            dispatch({
                type: constants.LOGIN_SUCCESS,
                payload: res.data
            });
            dispatch(load_user());
          };
    } catch (err) {
        dispatch({
            type: constants.LOGIN_FAIL
        })
    }
};

export const signup = (first_name: string, last_name: string, email: string, password: string, re_password: string) => async (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ first_name, last_name, email, password, re_password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);
        return async (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
            await window.localStorage.setItem("authenticated", "true");
            dispatch({
                type: constants.SIGNUP_SUCCESS,
                payload: res.data
            });
          };
        
    } catch (err) {
        return async (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
            dispatch({
                type: constants.SIGNUP_FAIL
            })
    }
};
}

export const verify = (uid: string, token: string) => async (dispatch: Dispatch<AuthenticationAction, {}, any>) =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config);

        dispatch({
            type: constants.ACTIVATION_SUCCESS,
        });
    } catch (err) {
        dispatch({
            type: constants.ACTIVATION_FAIL
        })
    }
};

export const reset_password = (email: string) => async (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);

        dispatch({
            type: constants.PASSWORD_RESET_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: constants.PASSWORD_RESET_FAIL
        });
    }
};

export const reset_password_confirm = (uid: string, token: string, new_password: string, re_new_password: string) => async (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);

        dispatch({
            type: constants.PASSWORD_RESET_CONFIRM_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: constants.PASSWORD_RESET_CONFIRM_FAIL
        });
    }
};
export interface IUnauthenticate {
    type: constants.LOGOUT;
}
export function logout(): IUnauthenticate {
return {
    type: constants.LOGOUT,
};
}

export const logout_test = () => dispatch => {
    dispatch({
        type: constants.LOGOUT
    });
};
