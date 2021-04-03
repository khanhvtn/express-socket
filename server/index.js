const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*',
    },
});
const cors = require('cors');

//user cors
app.use(cors());

app.get('/', (request, response) => {
    response.send(`<h1>Hello World</h1>`);
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    //event
    socket.on('event', (event) => {
        console.log(event);
        io.emit('event', event);
    });
});

http.listen(5000, () => {
    console.log(`listing on port ${http.address}`);
});
