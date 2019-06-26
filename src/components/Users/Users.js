import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Users = ({ users }) => {
    if (!users) return null;
    return (
        <div>
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
        </div>
    );
};

export default Users;
