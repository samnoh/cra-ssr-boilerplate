import React from 'react';
import { Helmet } from 'react-helmet';

import Home from '../components/Home';

const HomeContainer = () => {
    return (
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Home />
        </>
    );
};

export default HomeContainer;
