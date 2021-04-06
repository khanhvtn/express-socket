import React, { useState } from 'react';
import useStyles from './styles';
import { Grid, TextField, Button, Paper } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';

const initialState = {
    email: '',
    password: '',
};
const Auth = () => {
    const [state, setState] = useState(initialState);
    const dispatch = useDispatch();
    const css = useStyles();
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleChange = (e) => {
        setState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    return (
        <Grid
            className={css.wrapper}
            container
            justify="center"
            alignItems="center"
        >
            <Paper elevation={3}>
                <form className={css.form} onSubmit={handleSubmit} noValidate>
                    <TextField
                        className={css.input}
                        label="Email"
                        type="email"
                        name="email"
                        variant="outlined"
                        fullWidth
                        value={state.email}
                        onChange={handleChange}
                        size="medium"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        variant="outlined"
                        fullWidth
                        value={state.password}
                        onChange={handleChange}
                        size="medium"
                        className={css.input}
                    />
                    <Button
                        className={css.btnSubmit}
                        variant="contained"
                        fullWidth
                        size="large"
                    >
                        Login
                    </Button>
                </form>
            </Paper>
        </Grid>
    );
};
export default Auth;
