import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import users, { usersSaga } from './users';
import user, { userSaga } from './user';
import posts, { postsSaga } from './posts';
import loading from './loading';

const rootReducer = combineReducers({
    users,
    user,
    posts,
    loading
});

export function* rootSaga() {
    yield all([usersSaga(), userSaga(), postsSaga()]);
}

export default rootReducer;
