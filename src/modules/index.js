import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import users, { usersSaga } from './users';
import loading from './loading';

const rootReducer = combineReducers({
    users,
    loading
});

export function* rootSaga() {
    yield all([usersSaga()]);
}

export default rootReducer;
