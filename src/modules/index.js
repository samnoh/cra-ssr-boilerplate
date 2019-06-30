import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import users, { usersSaga } from './users';
import posts, { postsSaga } from './posts';
import loading from './loading';

const rootReducer = combineReducers({
    users,
    posts,
    loading
});

export function* rootSaga() {
    yield all([usersSaga(), postsSaga()]);
}

export default rootReducer;
