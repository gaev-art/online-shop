import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import React from "react";
import { UserMenu } from "./UserMenu";
import logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";

// const pages = ['first'];

type PropsType = {
  user: any;
};
export const Header = (props: PropsType) => {
  const history = useNavigate();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <img
              onClick={() => history("/")}
              src={logo}
              alt=""
              style={{ cursor: "pointer", width: "50px" }}
            />
            {/*    {pages.map((page) => (*/}
            {/*        <NavLink style={{textDecoration: 'none', color:'white', marginRight: '20px'}} key={page} to={page}>*/}
            {/*          {page}*/}
            {/*        </NavLink>*/}
            {/*    ))}*/}
          </Box>
          {!props.user ? (
            <Button
              style={{ color: "white" }}
              onClick={() => {
                // dispatch(login())
                window.open(
                  `${process.env.REACT_APP_API_BASE_URL}/login`,
                  "_self"
                );
              }}
            >
              Login with Google
            </Button>
          ) : (
            <UserMenu user={props.user} />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
