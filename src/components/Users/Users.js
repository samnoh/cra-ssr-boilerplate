import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Users = ({ users, loading }) => {
    return (
        <>
            {loading && <h1>Loading</h1>}
            {!loading && users && (
                <>
                    <Helmet>
                        <title>Users</title>
                    </Helmet>
                    <ul>
                        {users.map(user => (
                            <li key={user.id}>
                                <Link to={`/users/${user.id}`}>{user.username}</Link>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </>
    );
};

export default Users;
