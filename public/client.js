const socket = io();
const inputarea = document.querySelector("#inputarea");
const messageArea = document.querySelector('.messages');
const userList = document.querySelector('.userlist');
const sendButton = document.querySelector('.send-button');

let namee;

// Prompt user for their name
do {
    namee = prompt("Enter Your Name: ");
} while (!namee);

// Notify the server of the new user
socket.emit("new-user", namee);

// Add the user's name to the list on the client
document.addEventListener("DOMContentLoaded", () => {
    if (namee) {
        console.log("User added:", namee);
        let use = `<li>${namee}</li>`;
        userList.innerHTML += use;
    }
});

// Send message on "Enter" key press
inputarea.addEventListener("keyup", (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
        sendMessage(e.target.value);
    }
});

// Send message on send button click
sendButton.addEventListener('click', () => {
  sendMessage(inputarea.value);
});

// Send message function
function sendMessage(message) {
    let msg = {
        user: namee,
        message: message.trim(),
    };

    appendMessage(msg, 'sender');
    inputarea.value = ""; // Clear input field
    scrollToBottom();

    // Send to server
    socket.emit("message", msg);
}

// Append message to the chat area
function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markUp = `
        <div class="sender-name">${msg.user}</div>
        <div class="message-content">${msg.message}</div>
    `;
    mainDiv.innerHTML = markUp;
    messageArea.appendChild(mainDiv);
}

// Receive a message from the server
socket.on("message", (msg) => {
    appendMessage(msg, 'receiver');
    scrollToBottom();
});

// Scroll to bottom of the message area
function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}

// Update user list when a user connects or disconnects
socket.on("update-userlist", (users) => {
    userList.innerHTML = ""; // Clear the existing user list
    users.forEach(user => {
        let userElement = `<li>${user.username}</li>`;
        userList.innerHTML += userElement;
    });
});
