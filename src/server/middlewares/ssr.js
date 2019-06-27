import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { StaticRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import path from 'path';

import App from '../../App';
import rootReducer, { rootSaga } from '../../modules';
import PreloadContext from '../../lib/preloaderContext';
import createPage from '../util/createPage';

const serverRender = async (req, res, next) => {
    const context = {};
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
    const sagaPromise = sagaMiddleware.run(rootSaga).toPromise();
    const preloadContext = {
        done: false,
        promises: []
    };
    const extractor = new ChunkExtractor({
        statsFile: path.resolve('./build/loadable-stats.json')
    });

    const jsx = (
        <ChunkExtractorManager extractor={extractor}>
            <PreloadContext.Provider value={preloadContext}>
                <Provider store={store}>
                    <StaticRouter location={req.url} context={context}>
                        <App />
                    </StaticRouter>
                </Provider>
            </PreloadContext.Provider>
        </ChunkExtractorManager>
    );
    ReactDOMServer.renderToStaticMarkup(jsx);

    store.dispatch(END);
    try {
        await sagaPromise;
        await Promise.all(preloadContext.promises);
    } catch (e) {
        return res.status(500);
    }
    preloadContext.done = true;

    const root = ReactDOMServer.renderToString(jsx);
    const escapedString = JSON.stringify(store.getState()).replace(/</g, '\\u003c');
    const stateScript = `<script>__PRELOADED_STATE__ = ${escapedString}</script>`;
    const tags = {
        scripts: stateScript + extractor.getScriptTags(),
        links: extractor.getLinkTags(),
        styles: extractor.getStyleTags()
    };
    const helmet = Helmet.renderStatic();

    if (context.isNotFound) {
        res.status(404);
    }
    res.send(createPage(root, tags, helmet));
};

export default serverRender;
