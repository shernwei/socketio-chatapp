const chalk = require('chalk'); 
const signale = require('signale');
const server = require('http').createServer();
const env = process.env;
const port = env.PORT || 3000;

var ioServerOptions = {
    /*
    serveClient: false,
    pingTimeout: 5000,
    pingInterval: 5000,*/
    path: '/chat',
    transports: ['polling'],
    allowUpgrades: false
}; //put it in a module soon*/ 

const io = require('socket.io')(server, ioServerOptions);
const { generateMessage } = require('./utils/messages');
const  { onTopicSubscribe, onMultipleTopicSubscribe } = serviceRequired('subscribe');
const { onPublishMessage } = serviceRequired('publish');
const { onSendMessage } = serviceRequired('message');
const { onTopicUnsubscribe } = serviceRequired('unsubscribe'); 



io.on('connection', connectionCallback);

function connectionCallback(socket){
    // console.log(chalk.blue(`connection initiated by ${socket.id}`));
    socket.on('subscribeSingle', onTopicSubscribe(io, socket));
    socket.on('subscribeMultiple', onMultipleTopicSubscribe(io, socket));
    socket.on('publishMessage', onPublishMessage(io, socket));
    socket.on('unsubscribe', onTopicUnsubscribe(io, socket));
    socket.on('sendMessage', onSendMessage(io, socket));
}

server.listen(port, function(err){
    if(err) throw err;
    signale.success(chalk.green(`Listening on port ${port}`));
});

function serviceRequired(file){
    return require(`../services/${file}.js`);
}

// function welcomeMessage(socket){

//     return (options, callback) => {
//         socket.emit('message', generateMessage(options.username, 'Welcome!'))
//         socket.broadcast.to(options.organization).emit('message', generateMessage(options.username, 'has joined!'));
//         callback('success');
//     }
// }