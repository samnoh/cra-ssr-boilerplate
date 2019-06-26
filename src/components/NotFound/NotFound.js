import React from 'react';
import { Helmet } from 'react-helmet';

import './NotFound.scss';

const NotFound = ({ message }) => {
    return (
        <>
            <Helmet>
                <title>404</title>
            </Helmet>
            <h1>Not Found - {message}</h1>
        </>
    );
};

export default NotFound;
