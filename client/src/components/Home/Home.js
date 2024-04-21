import React, { useState} from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@mui/material';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { getPostBySearch } from '../../actions/posts';
import { useNavigate, useLocation } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import { useDispatch } from 'react-redux';


import Pagein from '../Pagein';


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Home() {
    const [currentId, setcurrentId] = useState(0);
    const dispatch = useDispatch();

    const query = useQuery();
    let navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const [Search, setSearch] = useState('');
    const [tags, settags] = useState([]);


    const handleKey = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    };

    const handleAdded = (tag) => settags([...tags, tag]);
    const handleDel = (tagtodel) => settags(tags.filter((tag) => tag !== tagtodel));

    const searchPost = () => {
        if (Search.trim() || tags) {
            dispatch(getPostBySearch({ Search, tags: tags.join(',') }));
            navigate(`/posts/search?searchQuery=${Search || 'none'}&tags=${tags.join(',')}`);
        } else {
            navigate('/');
        }
    }


    return (
        <Grow in style={{padding:'15px'}}>
            <Container >
                <Grid container justify='space-between' alignItems='stretch' spacing={3} className='gridContainer'>
                    <Grid item xs={12} sm={7} md={8}>
                        <Posts setcurrentId={setcurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                        <AppBar className='appBarsearch' position='static' color='inherit'>
                            <TextField name='search' variant='outlined' label='Search Memories' fullWidth value={Search} onKeyDown={handleKey} onChange={(e) => setSearch(e.target.value)} />
                            <Chip
                                style={{ margin: "10px 0" }}
                                value={tags}
                                onClick={(chip) => handleAdded(chip)}
                                onDelete={(chip) => handleDel(chip)}
                                label='Search Tags'
                                variant='outlined'
                            />
                            <Button onClick={searchPost} className='searchButton' variant="contained" color="primary">Search</Button>


                            <Form currentId={currentId} setcurrentId={setcurrentId} />
                            {(!searchQuery && !tags.length) && (
                                <Paper elevation={6} >
                                    <Pagein page={page} />
                                </Paper>
                            )}
                        </AppBar>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home