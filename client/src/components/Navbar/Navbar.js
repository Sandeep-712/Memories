import React, { useState, useEffect } from 'react'
import { AppBar, Typography, Avatar, Button } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ima from '../../Images/ima.jpg';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';


function Navbar() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();


    const logout = () => {
        dispatch({ type: 'LOGOUT' });

        navigate('/');
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodeToken = jwtDecode(token);

            if (decodeToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location, user?.token]);

    return (
        <AppBar  position='static' color='inherit'>
            <Toolbar  style={{display:'flex',justifyContent:'space-between'}}>
            <Link to='/' >
                <img src={ima} alt='icon' height='40px' style={{borderRadius:'50%'}}/>
            </Link>

                {user?.result ? (
                    <div  style={{display:'flex'}}>
                        <Avatar  alt={user?.result.name} src={user?.result.imagUrl}>
                            {user?.result.name.charAt(0)}
                        </Avatar>
                        <Typography  variant='h6'  style={{marginLeft:'5px'}}>
                            {user?.result.name.split(' ')[0]}
                        </Typography>
                        <Button variant='contained'  color='secondary' onClick={logout} style={{marginLeft:'10px'}}>Log Out</Button>
                    </div>
                ) : (
                    <Button component={Link} to='/auth' variant='contained' color='primary'>
                        Sign In
                    </Button>
                    // <Link to='/auth'>
                    //     <Button variant='contained' color='primary'>Sign in</Button>
                    // </Link>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;