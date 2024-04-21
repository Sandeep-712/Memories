import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import './App.css'
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import PostDetail from './components/PostDetails/PostDetail';


function App() {

  function AuthRoute() {
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();

    useEffect(() => {
      if (user) {
        navigate('/posts');
      }
    }, [user, navigate]);

    return user ? null : <Auth />;

  }


  return (
    <BrowserRouter>
      <Container maxwidth='xl'>
        <Navbar />
        <Routes>
          <Route path='*' element={<Navigate to='/posts' />} />
          <Route path='/posts' element={<Home />} />
          <Route path='/posts/search' element={<Home />} />

          <Route path='/posts/:id' element={<PostDetail />} />
          <Route path='/auth' element={<AuthRoute />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
