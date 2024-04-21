import { FETCH_ALL, FETCH_POST, DELETE, UPDATE, LIKE, CREATE, FETCH_By_Search, START_LOADING, END_LOADING } from '../constants/actionTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberofPage: action.payload.numberofPage,
            };

        case FETCH_By_Search:
            return { ...state, posts: action.payload.data };

        case FETCH_POST:
            return { ...state, post: action.payload.post};

        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };

        case UPDATE:
        case LIKE:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };

        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };

        default:
            return state;
    }
}