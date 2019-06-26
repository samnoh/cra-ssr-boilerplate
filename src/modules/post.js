import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';

import * as api from 'lib/api';
import createRequestSaga from 'lib/createRequestSaga';

const GET_POST = 'post/GET_POST';
const GET_POST_SUCCESS = 'post/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'post/GET_POST_FAILURE';

export const getPost = createAction(GET_POST, id => id);

const getPostSaga = createRequestSaga(GET_POST, api.getPost);

export function* postSaga() {
    yield takeLatest(GET_POST, getPostSaga);
}

const initialState = {
    post: null
};

const post = handleActions(
    {
        [GET_POST_SUCCESS]: (state, action) => ({
            ...state,
            post: action.payload
        }),
        [GET_POST_FAILURE]: (state, action) => ({
            ...state,
            post: { title: 'error', id: '404' }
        })
    },
    initialState
);

export default post;
