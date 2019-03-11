// send Info to everyone in the room for a connection socket except self
const { generateMessage } = require('../server/utils/messages');

function onPublishMessage(io, socket){
    return (options,callback) => {
        for (let i = 1; i < socket.rooms.length; i++) {
            socket.broadcast.to(socket["room"]).emit('message', generateMessage(options.username, options.message));
        }

        callback('success');
    }
}

module.exports = {
    onPublishMessage: onPublishMessage
};