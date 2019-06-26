import React, { useEffect } from 'react';
import Users from '../components/Users';
import { connect } from 'react-redux';
import { getUsers } from '../modules/users';
import { Preloader } from '../lib/preloaderContext';

const UsersContainer = ({ users, getUsers, loading }) => {
    useEffect(() => {
        if (users) return;
        const fn = async () => {
            try {
                getUsers();
            } catch (e) {
                console.error(e);
            }
        };
        fn();
    }, [getUsers, users]);

    return (
        <>
            <Users users={users} loading={loading} />
            <Preloader resolve={getUsers} />
        </>
    );
};

export default connect(
    ({ users, loading }) => ({
        users: users.users,
        loading: loading['users/GET_USERS']
    }),
    {
        getUsers
    }
)(UsersContainer);
