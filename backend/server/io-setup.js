


const  { onTopicSubscribe, onMultipleTopicSubscribe } = serviceRequired('subscribe');
const { onPublishMessage } = serviceRequired('publish');
const { onSendMessage } = serviceRequired('message');
const { onTopicUnsubscribe, onCloseConnection } = serviceRequired('unsubscribe');
const ioServerOptions = {
    /*
    serveClient: false,
    pingTimeout: 5000,
    pingInterval: 5000,*/
    path: '/chat',
    transports: ['polling'],
    allowUpgrades: false
};

var io;

function setup(server){
    io = require('socket.io')(server, ioServerOptions);
    io.on('connection', connectionCallback);
}  

function connectionCallback(socket){
    socket.on('subscribeSingle', onTopicSubscribe(io, socket));
    socket.on('subscribeMultiple', onMultipleTopicSubscribe(io, socket));
    socket.on('publishMessage', onPublishMessage(io, socket));
    socket.on('unsubscribe', onTopicUnsubscribe(io, socket));
    socket.on('sendMessage', onSendMessage(io, socket));
    socket.on('disconnect',onCloseConnection(io, socket));
}

function serviceRequired(file){
    return require(`../services/${file}.js`);
}

module.exports = { setup }