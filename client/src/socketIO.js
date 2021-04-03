import { io } from 'socket.io-client';

const SV_ADDRESS = 'http://localhost:5000/';
const socket = io(SV_ADDRESS, {
    auth: {
        token: 'userToken'
    }
});

export default socket;