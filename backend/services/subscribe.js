function onTopicSubscribe(io, socket){
    return (options, callback)=>{
        socket.join(options.organization,(err) => {
            if(err) callback(err);
            callback('Subscribe Successfully');
        }); //after join socket.rooms will be populated
        //console.log(socket.rooms);
        //socket[room] = options.organization;
        
    }
}

function onMultipleTopicSubscribe(io, socket){
    return (options, callback) => {

        if(Array.isArray(options.organization)){
            socket.join(options.organization,(err) => {
                if(err) callback(err);
                callback('Subscribe Successfully');
            });
        }
        
    }
}

module.exports = {
    onTopicSubscribe,
    onMultipleTopicSubscribe
}