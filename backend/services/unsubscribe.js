

function onTopicUnsubscribe(io, socket){
    
    return (roomName, callback) => {
        try{
            socket.leave(roomName);
            socket.disconnect(true);
            callback('success');
        }catch(err){
            callback(err);
        }
    }
}

function onCloseConnection(io, socket){
    return () => {
        socket = socket.disconnect(true);
    }
}

module.exports = {
    onTopicUnsubscribe: onTopicUnsubscribe,
    onCloseConnection: onCloseConnection
};