import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const SV_ADDRESS = 'http://localhost:5000/';
const socket = io(SV_ADDRESS);

const App = () => {
    const [state, setState] = useState({
        message: '',
    });
    const ioRef = useRef();
    ioRef.current = socket;
    useEffect(() => {
        ioRef.current.on('connect', () => {
            console.log(socket.id);
        });
        ioRef.current.on('event', (event) => {
            console.log(event);
        });
        return ioRef.current.on('disconnect', () => {
            console.log(socket.id);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        ioRef.current.emit('event', state.message);
        setState((prevState) => ({ ...prevState, message: '' }));
    };
    const handleChange = (e) => {
        setState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <input
                    name="message"
                    value={state.message}
                    onChange={handleChange}
                    type="text"
                />
                <input value="send" type="submit" />
            </form>
        </div>
    );
};

export default App;
