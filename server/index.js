const app = require('express')();
const http = require('http').createServer(app);
const mongoose = require('mongoose');
const io = require('socket.io')(http, {
    cors: {
        origin: '*',
    },
});
const port = process.env.PORT || 5000;
const Event = require('./models/event');

//Connect to mongod db
const mongoURL =
    'mongodb+srv://khanhvtn93:khanhvtn93123@cluster0.zjom9.mongodb.net/mersStack?authSource=admin&replicaSet=atlas-l3xb7s-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true';
mongoose
    .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connect to database successfully'))
    .catch((err) => console.log(err));
//Route
app.get('/', (request, response) => {
    response.send(`<h1>Hello World</h1>`);
});

//socket io middleware
io.use((socket, next) => {
    const { token } = socket.handshake.auth;
    console.log(token);
    if (token === 'userToken') {
        next();
    } else {
        next(new Error('Invalid Credential.'));
    }
}).on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log(`user ${socket.id} disconnected`);
    });

    //event
    socket.on('event', async (event) => {
        //save event to mongo db
        try {
            const newEvent = await Event.create({
                name: event,
            });
            io.emit('event', newEvent);
        } catch (error) {
            console.log(error);
        }
    });
});

http.listen(port, () => {
    console.log(`listing on port ${port}`);
});
