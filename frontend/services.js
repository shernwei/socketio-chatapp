const log = console.log;


var connectSocket = (function(){
    function socketChecking(socket) {
        if (socket.constructor.name !== 'r') {
            throw new Error('Please pass in a valid socket')
        }
        return true;
    }
    
    function errorChecking(err, message) {
        if (err instanceof Error) {
            throw new Error(message);
        }
    }
    
    function acknowledgeCallbackCheck(acknowledgeCallback){
    
        if(typeof acknowledgeCallback === "function"){
            console.log('Enter acknowledgeCallback');
            acknowledgeCallback('success')
        }
    }
    
    function startConnection(serverEndpoint) {
    
    
        try{
            serverEndpoint = serverEndpoint || 'http://localhost:3000';
            socket = io(serverEndpoint, {path: '/chat'});
            return socket;
        }catch(err){
            throw new Error(err.message);
        }
        
    }
    
    // "create/join  a Room/ seperate channel"
    function joinChatRoom(socket, userInfo, acknowledgeCallback) {
        
    
        socketChecking(socket);
        if (typeof userInfo !== 'object') {
            throw new Error('Please pass in valid parameter')
        }
        
        if (userInfo.organization && userInfo.username) {
    
            socket.emit('subscribeSingle', userInfo, (err) => {
                errorChecking(err, 'Unable to join the conversation');
                acknowledgeCallbackCheck(acknowledgeCallback)
            });
        }
    }
    
    
    function publishMessage(socket, options, acknowledgeCallback) {
        
    
        socketChecking(socket);
        socket.emit('publishMessage', options, (err) => {
            errorChecking(err, 'Unable to publish mesage');
            acknowledgeCallbackCheck(acknowledgeCallback)
        })
    }
    
    // sending a Chat Message and self
    function sendChatMessage(socket, options, acknowledgeCallback) {
    
        log('send chat message')
        socketChecking(socket);
        socket.emit('sendMessage', options, (err) => {
            errorChecking(err, 'Unable to send chat message');   
            acknowledgeCallbackCheck(acknowledgeCallback) 
        })
    }
    
    function onMessage(socket, callback){
        socket.on('message', callback);
    }
    
    // quiting the connection
    function closeConnection(socket) {
    
        socketChecking(socket);
        socket.disconnect();
    }



    return{
        startConnection: startConnection,
        closeConnection: closeConnection,
        onMessage: onMessage,
        sendChatMessage: sendChatMessage,
        publishMessage: publishMessage,
        joinChatRoom: joinChatRoom
    }

})();
