import {
  Button,
  FormControl,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import {useFormik} from 'formik';
import React from 'react';
import {useNavigate} from 'react-router-dom';

export const Login = () => {
  const history = useNavigate();

  const formik = useFormik({
    validate: (values: { password: string; name: string }) => {
      if (!values.name) {
        return {
          name: 'Name is required',
        };
      }
      if (!values.password) {
        return {
          password: 'Password is required',
        };
      }
    },
    initialValues: {
      password: '',
      name: '',
      isSecondButton: false,
    },
    onSubmit: async (values) => {
      // await dispatch(login({email: values.name, password: values.password}))
      history('/');
    },
  });

  return (
    <Grid
      container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Typography style={{margin: '15px'}} variant="h3">
          Welcome!
        </Typography>
        <FormControl>
          <FormGroup>
            <TextField
              label="Name"
              margin="normal"
              variant="outlined"
              {...formik.getFieldProps('name')}
            />
            {formik.errors.name ? (
              <div style={{color: 'red'}}>{formik.errors.name}</div>
            ) : null}
            <TextField
              label="Password"
              margin="normal"
              variant="outlined"
              type="password"
              {...formik.getFieldProps('password')}
            />
            {formik.errors.password ? (
              <div style={{color: 'red'}}>{formik.errors.password}</div>
            ) : null}
            <Grid container justifyContent="center" alignItems="center">
              <Button type="submit">Login</Button>
            </Grid>
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  );
};
