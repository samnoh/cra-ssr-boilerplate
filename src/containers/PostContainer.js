import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Post from '../components/Post';
import { getPost } from '../modules/post';

const PostContainer = ({ id, post, loadingPost, getPost }) => {
    useEffect(() => {
        const fn = async () => {
            try {
                await getPost(id);
            } catch (e) {
                console.error(e);
            }
        };
        fn();
    }, [getPost, id]);

    return <Post id={id} post={post} loadingPost={loadingPost} />;
};

export default connect(
    ({ post, loading }) => ({
        post: post.post,
        loadingPost: loading['post/GET_POST']
    }),
    {
        getPost
    }
)(PostContainer);
