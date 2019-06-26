import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import post, { postSaga } from './post';
import loading from './loading';

const rootReducer = combineReducers({
    post,
    loading
});

export function* rootSaga() {
    yield all([postSaga()]);
}

export default rootReducer;
