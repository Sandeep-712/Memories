import * as api from '../api/index.js';
import { AUTH } from '../constants/actionTypes';


export const signin = (formData, navigate) => async (dispatch) => {
    try {
        // login user
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });

        navigate('/');

    } catch (error) {
        console.error('Error signing in:', error);
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        // signup user
        const { data } = await api.signUp(formData);

        console.log(data);
        dispatch({ type: AUTH, data });

        navigate('/');
    } catch (error) {
        console.error('Error signing up:', error);
    }
}