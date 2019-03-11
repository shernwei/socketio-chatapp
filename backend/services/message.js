const { generateMessage } = require('../server/utils/messages');

function onSendMessage(io, socket){
    console.log(socket.rooms);
    return (options, callback) => {
        io.to(options.organization).emit('message', generateMessage(options.username, options.message));
        callback('success');
    }
}

module.exports = {
    onSendMessage: onSendMessage
};