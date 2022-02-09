import { AppBar, Avatar, Box, Button, Container, IconButton, Toolbar } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { actions } from '../../redux/authReducer';

const pages = ['first', 'second'];

type PropsType = {
  isAuth: boolean
}

export const Header = (props: PropsType) => {

  const dispatch = useDispatch()

  return (
    <AppBar position="static" >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            {pages.map((page) => (
              <NavLink style={{ textDecoration: 'none', marginRight: '20px' }} key={page} to={page}>
                <Button style={{ color: 'white' }} >{page}</Button>
              </NavLink>
            ))}
          </Box>
          {!props.isAuth
            ?
            <NavLink style={{ textDecoration: 'none', marginRight: '20px' }} to={'/login'}>
              <Button style={{ color: 'white' }}>Login</Button>
            </NavLink>
            :
            <Box  style={{ marginRight: '20px' }} sx={{ flexGrow: 0 }}>
              <IconButton>
                <Avatar alt="Gaev art" src="" />
              </IconButton>
            </Box>}
          <Button
            onClick={() => {
              dispatch(actions.setToken(''))
              localStorage.setItem('token', '')
            }} style={{ color: 'white' }}>
            Logout
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};