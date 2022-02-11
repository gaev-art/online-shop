import {AppBar, Box, Button, Container, Toolbar} from '@mui/material';
import React from 'react';
import {NavLink} from 'react-router-dom';

const pages = ['first', 'second'];

type PropsType = {
    user: any
}
export const Header = (props: PropsType) => {

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{flexGrow: 1}}>
                        {pages.map((page) => (
                            <NavLink style={{textDecoration: 'none', marginRight: '20px'}} key={page} to={page}>
                                <Button style={{color: 'white'}}>{page}</Button>
                            </NavLink>
                        ))}
                    </Box>
                    {!props.user
                        ?
                        <Button style={{color: 'white'}} onClick={() => {
                            // dispatch(login())
                            window.open("http://localhost:5000/login", "_self");
                        }
                        }>Login with Google</Button>
                        :
                        <>
                            <img
                                src={props.user.photo}
                                alt=""
                                style={{height: '30px'}}
                            />
                            <span style={{margin: '0 50px 0 10px'}}>{props.user.lastName}{ props.user.firstName}</span>
                            <Button
                                onClick={() => {
                                    // dispatch(logout())
                                    window.open("http://localhost:5000/logout", "_self");
                                }} style={{color: 'white'}}>
                                Logout
                            </Button>
                        </>}
                </Toolbar>
            </Container>
        </AppBar>
    );
};