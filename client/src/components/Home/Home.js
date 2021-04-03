import React, { useEffect, useState } from 'react';
import {
    TextField,
    Typography,
    Button,
    Grid,
    ListItem,
    ListItemText,
} from '@material-ui/core';
import useStyles from './styles';
import { useHistory, Link } from 'react-router-dom';
import { createSocket } from '../../socketIO';
let socket;
const initialState = {
    event: '',
    listEvent: [],
};
const Home = () => {
    const css = useStyles();
    const [state, setState] = useState(initialState);
    const history = useHistory();
    useEffect(() => {
        socket = createSocket();
        socket.on('event', (event) => {
            setState((prevState) => ({
                ...prevState,
                listEvent: [...prevState.listEvent, event.name],
            }));
        });
        socket.on('connect_error', (error) => {
            console.log(error.message);
            socket.close();
            history.push('/login');
        });
        return () => {
            socket.close();
        };
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit('event', state.event);
        setState((prevState) => ({ ...prevState, event: '' }));
    };
    const handleChange = (e) => {
        setState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    return (
        <div>
            <Link to="/login">Login</Link>
            <Typography className={css.title} variant="h3" gutterBottom>
                Create Event
            </Typography>
            <Grid container justify="center" alignItems="center" spacing={3}>
                <Grid item xs={12} sm={4}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Event name"
                            name="event"
                            value={state.event}
                            onChange={handleChange}
                            type="text"
                            variant="outlined"
                            fullWidth
                        />
                        <Button
                            className={css.btnSubmit}
                            variant="contained"
                            fullWidth
                            color="primary"
                            type="submit"
                        >
                            Create
                        </Button>
                    </form>
                </Grid>
                <Grid item xs={12} sm={8}>
                    {state.listEvent.map((event, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={event} />
                        </ListItem>
                    ))}
                </Grid>
            </Grid>
        </div>
    );
};

export default Home;
