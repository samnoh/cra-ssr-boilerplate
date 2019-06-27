import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import { StaticRouter } from 'react-router-dom';
import App from '../App';
import path from 'path';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from '../modules';
import PreloadContext from '../lib/preloaderContext';
import { END } from 'redux-saga';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import { Helmet } from 'react-helmet';
import logger from 'morgan';

const statsFile = path.resolve('./build/loadable-stats.json');

function createPage(root, tags, helmet) {
    const { title, meta } = helmet;
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1,shrink-to-fit=no"
    />
    <link rel="shortcut icon" href="/favicon.ico" />
    ${title.toString()}
    ${meta.toString()}
    ${tags.styles}
    ${tags.links}
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root">
      ${root}
    </div>
    ${tags.scripts}
  </body>
  </html>
    `;
}
const app = express();

const serverRender = async (req, res, next) => {
    const context = {};
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

    const sagaPromise = sagaMiddleware.run(rootSaga).toPromise();

    const preloadContext = {
        done: false,
        promises: []
    };

    const extractor = new ChunkExtractor({ statsFile });

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
    const helmet = Helmet.renderStatic();
    const stateString = JSON.stringify(store.getState()).replace(/</g, '\\u003c');
    const stateScript = `<script>__PRELOADED_STATE__ = ${stateString}</script>`;
    const tags = {
        scripts: stateScript + extractor.getScriptTags(),
        links: extractor.getLinkTags(),
        styles: extractor.getStyleTags()
    };

    res.send(createPage(root, tags, helmet));
};

const serve = express.static(path.resolve('./build'), {
    index: false
});

app.use(logger('dev'));
app.use(serve);
app.use(serverRender);

app.listen(5001, () => {
    console.log('Running on http://localhost:5001');
});
