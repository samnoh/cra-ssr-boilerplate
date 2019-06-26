import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer, { rootSaga } from './modules';

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    window.__PRELOADED_STATE__,
    applyMiddleware(logger, sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

export default store;
