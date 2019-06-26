import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { loadableReady } from '@loadable/component';

import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';
import store from 'store';

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
