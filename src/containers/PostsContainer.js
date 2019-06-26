import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Posts from '../components/Posts';
import { getPosts } from '../modules/posts';
import { Preloader } from '../lib/preloaderContext';

const PostsContainer = ({ posts, loading, getPosts }) => {
    useEffect(() => {
        if (posts) return;
        const fn = async () => {
            try {
                await getPosts();
            } catch (e) {
                console.error(e);
            }
        };
        fn();
    }, [getPosts, posts]);

    return (
        <>
            <Posts posts={posts} loading={loading} />
            <Preloader resolve={getPosts} />
        </>
    );
};

export default connect(
    ({ posts, loading }) => ({
        posts: posts.posts,
        loading: loading['posts/GET_POSTS']
    }),
    {
        getPosts
    }
)(PostsContainer);
