import express from 'express';
import path from 'path';
import logger from 'morgan';

import { serverRender } from './middlewares';

const app = express();

app.use(logger('dev'));
app.use(
    express.static(path.resolve('./build'), {
        index: false
    })
);
app.use(serverRender);

app.listen(5001, () => {
    console.log('Running on http://localhost:5001');
});
