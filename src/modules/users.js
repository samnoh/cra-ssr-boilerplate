import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';

import * as api from '../lib/api';
import createRequestSaga from '../lib/createRequestSaga';

const GET_USERS = 'users/GET_USERS';
const GET_USERS_SUCCESS = 'users/GET_USERS_SUCCESS';

export const getUsers = createAction(GET_USERS);

const getUsersSaga = createRequestSaga(GET_USERS, api.getUsers);

export function* usersSaga() {
    yield takeLatest(GET_USERS, getUsersSaga);
}

const initialState = {
    users: null
};

const users = handleActions(
    {
        [GET_USERS_SUCCESS]: (state, action) => ({
            ...state,
            users: action.payload
        })
    },
    initialState
);

export default users;
