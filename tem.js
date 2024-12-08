const express  = require("express");
const htpp = require("http");
const {Server} = require("socket.io");

const app = express();
const PORT =process.env.PORT || 8000;
// server
const server = htpp.createServer(app);

//path for static use.
app.use(express.static(__dirname + '/public'));


//socket
const io = new Server(server);

io.on("connection", (socket)=>{
    // console.log("conneted!", socket.id);

    // resive message form clint
    socket.on("message", (msg)=>{
        // console.log("server ",msg.id);
        socket.broadcast.emit("message", msg);
    })
});



//routes
app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html");
});


//listen
server.listen(PORT, ()=> console.log("Server Started!", PORT));
// https://chatapp-uc6n.onrender.com