import React, { useEffect, useState } from 'react';
import {
    TextField,
    Typography,
    Button,
    Grid,
    ListItem,
    ListItemText,
    CircularProgress,
} from '@material-ui/core';
import useStyles from './styles';
import { useHistory } from 'react-router-dom';
import { createSocket } from '../../../socketIO';
import { useDispatch, useSelector } from 'react-redux'
import { createEvent, getAllEvents } from '../../../actions/event'
import {ArrowBack} from '@material-ui/icons'
import { LOGOUT_USER } from '../../../actionTypes';
let socket;
const initialState = {
    event: '',
    listEvent: [],
};
const Home = () => {
    const { event } = useSelector((state) => state)
    const dispatch = useDispatch();
    const css = useStyles();
    const [state, setState] = useState(initialState);
    const history = useHistory();
    useEffect(() => {

        //fetch events
        dispatch(getAllEvents())

        //create socket
        socket = createSocket();
        socket.on('event', (event) => {
            dispatch(createEvent(event))
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

    //useEffect to set event from store to current state
    useEffect(() => {
        setState((prevState) => ({ ...prevState, listEvent: event.events }))
    }, [event.events])
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
    const handleLogout =()=>{
        dispatch({
            type: LOGOUT_USER
        })

        history.push('/')
    }
    return (
        <div>
            <Button startIcon={<ArrowBack/>} variant="text" onClick={handleLogout}>Logout</Button>
            <Typography className={css.title} variant="h3" gutterBottom>
                Create Event
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
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
                <Grid item xs={12} sm={9}>
                    {event.isLoading ? <CircularProgress /> : state.listEvent.map((event, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={event.name} />
                        </ListItem>
                    ))}
                </Grid>
            </Grid>
        </div>
    );
};

export default Home;
