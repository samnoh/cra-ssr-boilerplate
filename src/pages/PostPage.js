import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PostContainer from '../containers/PostContainer';

const PostPage = ({ id }) => {
    return (
        <>
            {+id >= 1 ? (
                <>
                    <PostContainer id={id} />
                    <Link to={`/post/${+id - 1}`}>Prev</Link>
                    {'  '}
                    <Link to={`/post/${+id + 1}`}>Next</Link>
                </>
            ) : (
                <Redirect to="/post/1" />
            )}
        </>
    );
};

export default PostPage;
