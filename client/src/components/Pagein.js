import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getPosts } from '../actions/posts';

function Pagein({ page }) {
    const dispatch = useDispatch();
    const { numberofPage } = useSelector((state) => state.posts);

    useEffect(() => {
        if (page) {
            dispatch(getPosts(page));
        }
    }, [dispatch,page]);

    return (
        <Pagination
            className='ul'
            count={numberofPage}
            page={Number(page) || 1}
            variant='outlined'
            color='secondary'
            renderItem={(item) => (
                <PaginationItem  {...item} component={Link} to={`/posts?page=${item.page}`} />
            )}
        />
    )
}

export default Pagein;