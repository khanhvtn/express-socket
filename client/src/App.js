import React, { useEffect, useState } from 'react';
import socket from './socketIO'
import { TextField, Typography, Button, Container, Grid, ListItem, ListItemText } from "@material-ui/core";
import useStyles from './styles'

const initialState = {
    event: '',
    listEvent: []
}
const App = () => {
    const [state, setState] = useState(initialState);
    const css = useStyles();
    useEffect(() => {
        socket.on('event', (event) => {
            console.log(event)
            setState((prevState) => ({ ...prevState, listEvent: [...prevState.listEvent, event] }))
        })
        socket.on('connect_error', (error) => {
            console.log(error.message)
        })

        return socket.on('disconnect', () => {
            console.log(socket.id);
        });
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
        <div className={css.wrapper}>
            <Container className={css.container} maxWidth="lg">
                <Typography className={css.title} variant="h3" gutterBottom>Create Event</Typography>
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
                            <Button className={css.btnSubmit} variant="contained" fullWidth color="primary" type="submit">Create</Button>
                        </form>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        {state.listEvent.map((event, index) =>
                            <ListItem key={index}>
                                <ListItemText
                                    primary={event}
                                />
                            </ListItem>,
                        )}
                    </Grid>
                </Grid>

            </Container>
        </div>
    );
};

export default App;
