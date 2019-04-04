var userOptions = [
    {username: 'Andy', organization: 'Accenture'},
    {username: 'Adrian', organization: 'Accenture'},
    {username: 'Shern Wei', organization: 'Accenture'},
    {username: 'Eugene', organization: 'Petronas'},
    {username: 'Kate', organization: 'Petronas'},
    {username: 'Peter', organization: 'AlphaWells'}
];

var currentUserIndex;

const $messageForm = document.querySelector('#message-form')
const $messageTextArea = $messageForm.querySelector('textarea')
const $messageFormButton = $messageForm.querySelector('button')
const $messages = document.querySelector('#chat-message')

const $userProfiles = document.getElementById('user-id')

const messageTemplate = document.querySelector('#message-template').innerHTML
const userTemplate = document.querySelector('#user-template').innerHTML;

var connectedStatus = false;

for(var i = 0; i < userOptions.length; i++){
    userOptions[i]["idVal"] = i;
    let html = Mustache.render(userTemplate, {
        id: userOptions[i].idVal,
        username: userOptions[i].username,
        organization: userOptions[i].organization
    });

    $userProfiles.insertAdjacentHTML('beforeend', html);
};

for (var i  = 0; i < $userProfiles.children.length; i++){
    let index = parseInt(i);

    $userProfiles.children[i].querySelector('.card-title').onclick = function(e){
        if(!connectedStatus){
            socket = connectSocket.startConnection('http://localhost:3000');//io('http://localhost:3000');
            connectedStatus = socket.connected;
            currentUserIndex = index;
            afterConnected(socket);
        }else{
            console.log('You have 1 user connected to the chat room');
        }
    }
}

function afterConnected(socket){

    connectSocket.receiveMessage(socket,(message) => {
        
        const html = Mustache.render(messageTemplate, {
            username: message.username,
            message: message.text,
            createdAt: message.createdAt
        });
        $messages.insertAdjacentHTML('beforeend', html)
    });
    connectSocket.joinChatRoom(socket, userOptions[currentUserIndex]);
    
    // socket.on('message', (message) => {

    //     // this.setState({message: message})
    //     // Redux 
    //     const html = Mustache.render(messageTemplate, {
    //         username: message.username,
    //         message: message.text,
    //         createdAt: message.createdAt
    //     });
    //     $messages.insertAdjacentHTML('beforeend', html)
    // });
    
    $messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        $messageFormButton.setAttribute('disabled', 'disabled')
        var messageValue = e.srcElement[0].value;
    
        var messageOptions ={
                                ...userOptions[currentUserIndex], 
                                message: messageValue
                            };

        connectSocket.sendChatMessage(socket,messageOptions,(status) => {
            if(status === 'success'){
                $messageFormButton.removeAttribute('disabled');
                $messageTextArea.value = '';
                $messageTextArea.focus();
            }
        });

        // socket.emit('sendMessage', messageOptions, (status) => {
        //     $messageFormButton.removeAttribute('disabled');
        //     $messageTextArea.value = '';
        //     $messageTextArea.focus();
        // })
    })
}
