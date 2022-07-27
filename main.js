const express = require("express")
const socketIO = require("socket.io")
const path = require("path");

const exp = express();

exp.use("/", express.static(path.join(__dirname, "model")))


const server = exp.listen(3000, (err)=>{ if (!err){ console.log("Server rodando na porta 3000")}})

const messages = []

const io = socketIO(server)

io.on("connection", (socket)=>{

    socket.emit("update_messages", messages)

    console.log("New connection")

    socket.on("new_message", (data)=>{

        messages.push(data)

        io.emit("update_messages", messages)

 })


})