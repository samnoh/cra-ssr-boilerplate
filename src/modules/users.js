import { createAction, handleActions } from 'redux-actions';
import { all, takeLatest } from 'redux-saga/effects';

import * as api from '../lib/api';
import createRequestSaga from '../lib/createRequestSaga';

const GET_USERS = 'users/GET_USERS';
const GET_USERS_SUCCESS = 'users/GET_USERS_SUCCESS';
const GET_USER = 'users/GET_USER';
const GET_USER_SUCCESS = 'users/GET_USER_SUCCESS';

export const getUsers = createAction(GET_USERS);
export const getUser = createAction(GET_USER, id => id);

const getUsersSaga = createRequestSaga(GET_USERS, api.getUsers);
const getUserSaga = createRequestSaga(GET_USER, api.getUserById);

export function* usersSaga() {
    yield all([takeLatest(GET_USER, getUserSaga), takeLatest(GET_USERS, getUsersSaga)]);
}

const initialState = {
    users: null,
    user: null
};

const users = handleActions(
    {
        [GET_USERS_SUCCESS]: (state, action) => ({
            ...state,
            users: action.payload
        }),
        [GET_USER_SUCCESS]: (state, action) => ({
            ...state,
            user: action.payload
        })
    },
    initialState
);

export default users;
