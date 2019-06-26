import React from 'react';

import './NotFound.scss';

const NotFound = ({ message }) => {
    return (
        <>
            <h1>Not Found - {message}</h1>
        </>
    );
};

export default NotFound;
