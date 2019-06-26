import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';

import * as api from '../lib/api';
import createRequestSaga from '../lib/createRequestSaga';

const GET_USER = 'user/GET_USER';
const GET_USER_SUCCESS = 'user/GET_USER_SUCCESS';

export const getUser = createAction(GET_USER, id => id);

const getUserSaga = createRequestSaga(GET_USER, api.getUserById);

export function* userSaga() {
    yield takeLatest(GET_USER, getUserSaga);
}

const initialState = {
    user: null
};

const user = handleActions(
    {
        [GET_USER_SUCCESS]: (state, action) => ({
            ...state,
            user: action.payload
        })
    },
    initialState
);

export default user;
