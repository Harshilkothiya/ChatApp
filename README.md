Real-Time Chat Application
A real-time chat application built with Node.js, Socket.IO, and a responsive frontend, allowing users to communicate with each other instantly.

Features
Real-Time Messaging: Messages are sent and received in real time using Socket.IO.
Dynamic User Display: Shows the current user in the header.
Responsive Design: Optimized for both desktop and mobile views.
Scroll-to-Bottom: Automatically scrolls to the latest message.
Customizable Theme: Easy-to-change colors and layouts with CSS.
Tech Stack
Frontend: HTML, CSS, and JavaScript.
Backend: Node.js and Express.js.
Real-Time Communication: Socket.IO.
Installation and Setup
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/chat-app.git
cd chat-app
Install dependencies:

bash
Copy code
npm install
Start the server:

bash
Copy code
npm start
Open your browser and navigate to:

arduino
Copy code
http://localhost:8000
File Structure
plaintext
Copy code
chat-app/
├── public/
│   ├── index.html       # Frontend HTML
│   ├── styles.css       # CSS for the chat application
│   └── client.js        # Client-side JavaScript
├── server.js            # Backend Node.js server
├── package.json         # Node.js dependencies and scripts
└── README.md            # Project documentation
How It Works
User Prompt: When the application loads, the user is prompted to enter their name.
Messaging: Users can send messages by pressing Enter or clicking the Send button.
Broadcast Messages: Messages are sent to all connected users except the sender.
Dynamic User List: Displays all active users in the sidebar.
