import React from 'react';
import UserContainer from '../containers/UserContainer';

const UserPage = ({ id }) => {
    return (
        <>
            <UserContainer id={id} />
        </>
    );
};

export default UserPage;
