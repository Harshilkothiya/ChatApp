const socket = io();
const textarea = document.querySelector("#textarea");
const massageArea = document.querySelector('.message__area');

let namee;

do {
  namee = prompt("Enter Your Name: ");
} while (!namee);

textarea.addEventListener("keyup",(e)=>{
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
});

function sendMessage(message){
   let msg ={
        user : namee,
        message : message.trim(),
    }

    appendMassage(msg, 'outgoing');

    textarea.value ="";

    scroolToBottom();

    // send toserver
    socket.emit("message", msg);
}

function appendMassage(msg, type){
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markUp = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markUp;
    massageArea.appendChild(mainDiv);
}


//resive message

socket.on('message', (msg)=>{
    appendMassage(msg, 'incoming');
    scroolToBottom();
})


function scroolToBottom(){
    massageArea.scrollTop = massageArea.scrollHeight;
}