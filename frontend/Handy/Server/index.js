const express = require("express");
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const http = require("http").Server(app);
const cors = require("cors");

app.use(cors());

const generateID = () => Math.random().toString(36).substring(2, 10);

let chatRooms = []

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "<http://localhost:3000>"
    }
});

//👇🏻 Add this before the app.get() block
socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);


    socket.on("createRoom", (roomName) => {
        console.log(roomName)
        socket.join(roomName);
        //👇🏻 Adds the new group name to the chat rooms array
        chatRooms.unshift({ id: generateID(), roomName, messages: [] });
        
        //👇🏻 Returns the updated chat rooms via another event
        socket.emit("sroomsLit", chatRooms);
    });




    socket.on('disconnect', () => {
      socket.disconnect()
      console.log('🔥: A user disconnected');
    });

})





app.get("/api", (req, res) => {
    res.json({
        message: "Hello world",
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});