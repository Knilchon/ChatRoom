const WebSocket = require("ws");
const app = require("express");
const http = require("http");

const server = http.createServer();

const wss = new WebSocket.Server({ port: 8000 })

const chat = []
const sockets = []

wss.on("connection", socket => {

    sockets.push(socket)

    console.log("all conections: ",sockets.length)
    console.log("Connected!")
    socket.send(JSON.stringify(chat));
    socket.on("message", data => {

        chat.push('' + data)
        console.log(chat)

        sockets.forEach((sock) => {
            sock.send(JSON.stringify(chat));
        })
    })

    socket.on("close",() => {
    const i = sockets.indexOf(socket)
    sockets.splice(i,1)
    console.log("all conections: ",sockets.length)
    })
})

wss.on("close",() => {
    console.log("Closed!")
})
wss.on("error",() => {
    console.log("Error!")
})
console.log("Running on " + 8000 + "!");

server.listen(3000, () => {
    setInterval(() => {
        console.log("Alive!")
      }, 10000);
})
