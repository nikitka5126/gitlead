import axios from 'axios';
import {returnErrors} from "./messages";

import {
    USER_LOADED, USER_LOADING, AUTH_ERROR
} from './types'

//CHECT TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    //User loading
    dispatch({type: USER_LOADING});

    //GET token from state

    const token = getState().auth.token;

    //HEADERS
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    //If token, add to headers config
    if (token) {
        config.headers['Authirization'] = `Token ${token}`;
    }

    axios.get('/api/auth/user', config)
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: AUTH_ERROR
        });
    });
}