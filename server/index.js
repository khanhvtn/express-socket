const express = require('express');
const app = express();
const http = require('http').createServer(app);
const mongoose = require('mongoose');
const cors = require('cors')
const io = require('socket.io')(http, {
    cors: {
        origin: '*',
    },
});
const { eventRoutes, userRoutes } = require('./routes');
const startSocketIO = require('./socketIO');
const port = process.env.PORT || 5000;


//user cors
app.use(cors())

//user bodyParser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Connect to mongod db
const mongoURL =
    'mongodb+srv://khanhvtn93:khanhvtn93123@cluster0.zjom9.mongodb.net/mersStack?authSource=admin&replicaSet=atlas-l3xb7s-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true';
mongoose
    .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connect to database successfully'))
    .catch((err) => console.log(err));

//Route
app.use('/api/event', eventRoutes);
app.use('/api/user', userRoutes);
app.get('/', (request, response) => {
    response.send(`<h1>Hello World</h1>`);
});

// start socket io
startSocketIO(io);

http.listen(port, () => {
    console.log(`listing on port ${port}`);
});
