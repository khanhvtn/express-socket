const { Event } = require('./models')
const startSocketIO = (io) => {
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
}

module.exports = startSocketIO;