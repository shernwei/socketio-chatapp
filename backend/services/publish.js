// send Info to everyone in the room for a connection socket except self
function onPublishMessage(io, socket){

    return (options,callback) => {
        for (let i = 1; i < socket.rooms.length; i++) {
            socket.broadcast.to(socket["room"]).emit('message', generateMessage(options.username, options.message));
        }

        callback('Success');
    }
}

module.exports = {
    onPublishMessage
};