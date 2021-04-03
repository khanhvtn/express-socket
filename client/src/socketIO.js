import { io } from 'socket.io-client';

const SV_ADDRESS = 'http://localhost:5000/';

export const createSocket = () => {
    return io(SV_ADDRESS, {
        auth: {
            token: 'userToken',
        },
    });
};
