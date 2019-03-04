const chalk = require('chalk'); 
const signale = require('signale');
const server = require('http').createServer();
const env = process.env;
const port = env.PORT || 3000;

/*var ioServerOptions = {
    serveClient: false,
    pingTimeout: 5000,
    pingInterval: 5000,
};*/

const io = require('socket.io')(server);
const { generateMessage } = require('./utils/messages');

var currentRoom;
io.on('connection', connectionCallback);

function connectionCallback(socket){
    console.log(chalk.blue(`connection initiated by ${socket.id}`));
    socket.on('join', (options, callback) => {
        currentRoom = options.organization
        socket.join(options.organization);
        socket.emit('message', generateMessage(options.username, 'Welcome!'))
        socket.broadcast.to(options.organization).emit('message', generateMessage(options.username, 'has joined!'));
        console.log(typeof callback)
    });

    socket.on('sendMessage', (options, callback) => {
        io.to(currentRoom).emit('message', generateMessage(options.username, options.message));
        callback('success');
    });
}

function onRoomJoin(socket){
    console.log(socket.id);
    return (options, callback) => {
        currentRoom = options.organization
        socket.join(options.organization);
        socket.emit('message', generateMessage(options.username, 'Welcome!'))
        socket.broadcast.to(options.organization).emit('message', generateMessage(options.username, 'has joined!'));

        callback('success');
    }
}

function onSendMessage(socket){
    return (options, callback) => {
        io.to(currentRoom).emit('message', generateMessage(options.username, options.message));
        callback('success');
    }
}

server.listen(port, function(err){
    if(err) throw err;
    signale.success(chalk.green(`Listening on port ${port}`));
});
