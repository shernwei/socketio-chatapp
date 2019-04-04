const { generateMessage } = require('../server/utils/messages');

function onTopicSubscribe(io, socket){
    return (options, callback)=>{

            socket.join(options.organization,(err) => {
                if(err) callback(err);
                socket.broadcast.to(options.organization).emit('message',generateMessage('Admin', `Welcome ${options.username}`));
                callback('success');
            }); 

        
    }
}

function onMultipleTopicSubscribe(io, socket){
    return (options, callback) => {

        if(Array.isArray(options.organization)){
            socket.join(options.organization,(err) => {
                if(err) callback(err);
                callback('success');
            });
        }
        
    }
}

module.exports = {
    onTopicSubscribe: onTopicSubscribe,
    onMultipleTopicSubscribe: onMultipleTopicSubscribe
};