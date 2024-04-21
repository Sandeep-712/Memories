import * as api from '../api';
import { FETCH_POST, FETCH_By_Search, START_LOADING, END_LOADING, FETCH_ALL, DELETE, UPDATE, LIKE, CREATE } from '../constants/actionTypes';
//action creators
export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPost(id);

        dispatch({ type: FETCH_POST, payload: { post: data } });
    } catch (error) {
        console.log(error.message);
    }
}

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data, currentPage, numberofPage } } = await api.fetchPosts(page);

        // console.log(data);
        dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberofPage } })
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}

export const getPostBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchPostBySearch(searchQuery);
        dispatch({ type: FETCH_By_Search, payload: data })
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post, navigate) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createPost(post);
        dispatch({ type: CREATE, payload: data })
        navigate(`post/${data._id}`);
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        await api.deletePost(id);

        dispatch({ type: DELETE, payload: id });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));

    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.likePost(id, user?.token);

        dispatch({ type: LIKE, payload: data })
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}