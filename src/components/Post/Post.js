import React from 'react';

const Post = ({ post, id, loadingPost }) => {
    return (
        <div>
            <h1>{loadingPost && 'loading'}</h1>
            <h1>{!loadingPost && post && `${post.id} - ${post.title}`}</h1>
        </div>
    );
};

export default Post;
