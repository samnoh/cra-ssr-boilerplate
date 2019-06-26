import React from 'react';
import { Helmet } from 'react-helmet';

const User = ({ user, loading }) => {
    return (
        <>
            {loading && <h1>Loading</h1>}
            {!loading && user && (
                <>
                    <Helmet>
                        <title>User | {user.username}</title>
                    </Helmet>
                    <h1>
                        {user.username} ({user.name})
                    </h1>
                    <p>
                        <b>e-mail:</b> {user.email}
                    </p>
                </>
            )}
        </>
    );
};

export default User;
