import React from 'react'
import Post from './Post/Post'
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@mui/material';

function Posts({ setcurrentId }) {
    const { posts, isLoading } = useSelector((state) => state.posts);

    if (!posts.length && !isLoading) return 'No posts';

    return (
        isLoading ? <CircularProgress /> : (
            <Grid className='container' container alignItems='stretch' spacing='3'>
                {
                    posts.map((post) => (
                        <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
                            <Post post={post} setcurrentId={setcurrentId} />
                        </Grid>
                    ))
                }
            </Grid>
        )
    )
}

export default Posts