import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import moment from 'moment';
import './post.css';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import { useNavigate } from 'react-router-dom';

function Post({ post, setcurrentId }) {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [likes, setLikes] = useState(post?.likes);
    let navigate = useNavigate();

    const dispatch = useDispatch();

    const userId = user?.result?._id;
    const hasLikedPost = post.likes.find((like) => like === userId);

    const handleLike = async (e) => {
        e.preventDefault();
        
        if (hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== userId));
        } else {
            setLikes([...post.likes, userId]);
        }
        
        dispatch(likePost(post._id));
    };

    const Likes = () => {
        if (likes.length > 0) {
            return likes.find((like) => like === userId)
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }

        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const openPost = (e) => {
        navigate(`/posts/${post._id}`)
    };

    return (
        <Card className='card' raised elevation={6}>

            <CardMedia className='media' image={post.selectedFile} title={post.title} />
            <div className='overlay'>
                <Typography variant='h6'>
                    {post.name}
                </Typography>
                <Typography variant='body2'>
                    {moment(post.createdAt).fromNow()}
                </Typography>
            </div>

            {(user?.result?._id === post?.creator) && (

                <div className='overlay2' name='edit'>
                    <Button style={{ color: 'white' }} size='small' 
                    onClick={(e) => {
                        e.stopPropagation();
                        setcurrentId(post._id)
                    }}
                    ><MoreHorizIcon fontSize='default' /></Button>
                </div>
            )
            }
            <ButtonBase className='cardAction' onClick={openPost}>

                <div className='details'>
                    <Typography variant='body2' color="textSecondary">
                        {post.tags.map((tag) => `#${tag} `)}
                    </Typography>
                </div>
                <Typography className='title' variant='h5' gutterBottom>
                    {post.title}
                </Typography>
                <CardContent>
                    <Typography variant='body2' color='textSecondary' component='p'>
                        {post.message}
                    </Typography>
                </CardContent>

            </ButtonBase>


            <CardActions className='cardActions'>
                <Button size='small' color='primary' disabled={!user?.result} onClick={handleLike}>
                    <Likes />
                </Button>
                {(user?.result?._id === post?.creator) && (
                    <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize='small' />
                        Del
                    </Button>
                )}
            </CardActions>
        </Card >
    )
}

export default Post