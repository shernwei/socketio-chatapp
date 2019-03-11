

function onTopicUnsubscribe(io, socket){
    
    return (roomName, callback) => {
        try{
            socket.leave(roomName);
            callback('success');
        }catch(err){
            callback(err);
        }
    }
}

module.exports = {
    onTopicUnsubscribe: onTopicUnsubscribe
};