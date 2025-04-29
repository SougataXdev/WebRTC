const express = require("express");
const bodyparser = require("body-parser");
const http = require("node:http")
const cors = require("cors")
const { Server } = require("socket.io");


const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});
const emailToSocketMapping = new Map();

const socketToEmailMapping = new Map();


io.on("connection", (socket) => {
    console.log(`new socket created ${socket.id}`);

    socket.on("join-room", (data) => {
        const { roomId, emailId } = data;
        emailToSocketMapping.set(emailId, socket.id);
        socketToEmailMapping.set(socket.id, emailId);
        socket.join(roomId);
        console.log(`User ${emailId} joined ${roomId} room`);
        socket.emit("joined-room", { roomId: roomId });
        socket.broadcast.to(roomId).emit("user-joined", { emailId: emailId });
    });


    socket.on("call-user", (data) => {
        const { emailId, offer } = data;
        console.log("calling user data recievd in backend", emailId , offer);
        const fromEmail = socketToEmailMapping.get(socket.id);
        console.log("fromm email", fromEmail); 
        const socketId = emailToSocketMapping.get(emailId);
        console.log("socket id", socketId);
        console.log("Emitting incoming-call to socket:", socketId);
        socket.to(socketId).emit("incoming-call", { from: fromEmail, offer });
        console.log("incoming call emitted");

        console.log("emailToSocketMapping:", emailToSocketMapping);
        console.log("socketToEmailMapping:", socketToEmailMapping);
    })
});




server.listen(8002, () => {
    console.log("http server is running on 8000");
})


