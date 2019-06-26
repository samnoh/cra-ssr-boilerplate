import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import User from '../components/User';
import { getUser } from '../modules/user';
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
    ({ user, loading }) => ({
        user: user.user,
        loading: loading['user/GET_USER']
    }),
    {
        getUser
    }
)(UserContainer);
