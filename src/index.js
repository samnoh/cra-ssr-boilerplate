import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { loadableReady } from '@loadable/component';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';
import rootReducer, { rootSaga } from './modules';

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    window.__PRELOADED_STATE__,
    applyMiddleware(logger, sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

const Root = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    );
};
const root = document.getElementById('root');

if (process.env.NODE_ENV === 'production') {
    loadableReady(() => {
        ReactDOM.hydrate(<Root />, root);
    });
} else {
    ReactDOM.render(<Root />, root);
}

serviceWorker.unregister();
