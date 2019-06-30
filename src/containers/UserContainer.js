import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import User from '../components/User';
import { getUser } from '../modules/users';
import { Preloader } from '../lib/preloaderContext';

const UserContainer = ({ id, user, getUser, loading }) => {
    useEffect(() => {
        if (user && user.id === +id) return;
        const fn = async () => {
            try {
                await getUser(id);
            } catch (e) {
                console.error(e);
            }
        };
        fn();
    }, [user, id, getUser]);

    return (
        <>
            <User user={user} loading={loading} />
            <Preloader resolve={() => getUser(id)} />
        </>
    );
};

export default connect(
    ({ users, loading }) => ({
        user: users.user,
        loading: loading['users/GET_USER']
    }),
    {
        getUser
    }
)(UserContainer);
