var socket;

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
    let index = parseInt($userProfiles.children[i].children[0].children[0].innerHTML);
    $userProfiles.children[i].querySelector('.card-title').onclick = function(e){
    
        socket = io('http://localhost:3000');
        currentUserIndex = index
        afterConnected();
    }
}

function afterConnected(){
    socket.on('message', (message) => {

        const html = Mustache.render(messageTemplate, {
            username: message.username,
            message: message.text,
            createdAt: message.createdAt
        });
        $messages.insertAdjacentHTML('beforeend', html)
    })
    
    socket.on('connect',() => {
        socket.emit('join', userOptions[currentUserIndex], (status) => {
            console.log(status)
        });
    })
    
    $messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        $messageFormButton.setAttribute('disabled', 'disabled')
        var messageValue = e.srcElement[0].value;
    
        var messageOptions ={
                                ...userOptions[currentUserIndex], 
                                message: messageValue
                            };
    
        socket.emit('sendMessage', messageOptions, (status) => {
            $messageFormButton.removeAttribute('disabled');
            $messageTextArea.value = '';
            $messageTextArea.focus();
        })
    })
}



function closeConnection(){
    socket.disconnect();
}


function sendMessage(){
    socket.emit('sendMessage', options, (status) => {
        if(status === 'success')
            console.log(options.username + " has sent a message");
    }) 
}