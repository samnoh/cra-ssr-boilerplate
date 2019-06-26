import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';

import * as api from '../lib/api';
import createRequestSaga from '../lib/createRequestSaga';

const GET_POSTS = 'posts/GET_POSTS';
const GET_POSTS_SUCCESS = 'posts/GET_POSTS_SUCCESS';

export const getPosts = createAction(GET_POSTS);

const getPostsSaga = createRequestSaga(GET_POSTS, api.getPosts);

export function* postsSaga() {
    yield takeLatest(GET_POSTS, getPostsSaga);
}

const initialState = {
    posts: null
};

const posts = handleActions(
    {
        [GET_POSTS_SUCCESS]: (state, action) => ({
            ...state,
            posts: action.payload
        })
    },
    initialState
);

export default posts;
