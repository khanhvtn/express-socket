import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import { Grid, TextField, Button, Paper, Zoom, Typography, Collapse, CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab'
import { Lock } from "@material-ui/icons";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/user'
import { useHistory } from 'react-router-dom'
import { clearError } from '../../actions/error';


const initialState = {
    email: '',
    password: '',
};
const Auth = () => {
    const [state, setState] = useState(initialState);
    const { error, user } = useSelector((state) => ({
        error: state.error,
        user: state.user
    }))
    const history = useHistory();
    const dispatch = useDispatch();
    const css = useStyles();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(state, history))
    };

    //clear error store
    useEffect(()=>{
        return dispatch(clearError())
    }, [])

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
            <Zoom in>
                <Paper className={css.paper} elevation={3}>
                    <Lock className={css.lockIcon} />
                    <Typography variant="h4">Login</Typography>
                    <Collapse style={{ width: '100%' }} in={error.message ? true : false}>
                        <Alert className={css.alert} severity="error">{error.message ? error.message : ''}</Alert>
                    </Collapse>
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
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            color="primary"
                        >
                            {user.isLoading ? <CircularProgress color="inherit" size="1.5rem" /> : "Login"}
                        </Button>
                    </form>
                </Paper>
            </Zoom>
        </Grid>
    );
};
export default Auth;
