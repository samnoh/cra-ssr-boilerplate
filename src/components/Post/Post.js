import React from 'react';

const Post = ({ post, id, loadingPost }) => {
    return (
        <div>
            {loadingPost && 'loading'}
            {!loadingPost && post && (
                <>
                    <h1>
                        {post.id} - {post.title}
                    </h1>
                    <p>{post.body}</p>
                </>
            )}
        </div>
    );
};

export default Post;
