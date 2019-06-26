import React from 'react';
import { Helmet } from 'react-helmet';

const Posts = ({ posts, loading }) => {
    return (
        <div>
            <Helmet>
                <title>Posts</title>
            </Helmet>
            {loading && <h1>loading...</h1>}
            {!loading && posts && (
                <ul>
                    {posts.map(post => (
                        <li key={post.id}>{post.title}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Posts;
