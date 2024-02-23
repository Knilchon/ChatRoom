const WebSocket = require("ws");
const express = require("express");
const path = require("path");
const https = require("https");
const fs = require("fs");

const app = express();
const serv = express();

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/knilchon.mywire.org/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/knilchon.mywire.org/fullchain.pem'),
};

serv.get("/", (req,res) => {
    res.sendFile(path.join(__dirname,"/FE/page.html"))
})
const server_https = https.createServer(options,serv)
const server = https.createServer(options,app)

//const wss = new WebSocket.Server({ server: server })
const wss = new WebSocket.Server({ port: 8000 })
let chat = []
const sockets = []

wss.on("connection", socket => {

    sockets.push(socket)
    console.log("all conections: ",sockets.length)
    console.log("Connected!")

    const response = {
    chat: chat,
    users: sockets.length
    }

    sockets.forEach((sock) => {
        sock.send(JSON.stringify(response));
    })

    socket.on("message", message => {

        var currentDate = new Date();

        var currentHour = currentDate.getUTCHours() + 1;
        var currentMinute = currentDate.getMinutes();

        var formattedTime = currentHour + ':' + (currentMinute < 10 ? '0' : '') + currentMinute;
	
        const unit = {
            message: '' + message,
            time: formattedTime,
        }

        chat.push(unit)
	if(message.includes("deletedeletedeletepls")){
	  chat = []
	}
        const response = { 
            chat: chat,
            users: sockets.length
        }

        sockets.forEach((sock) => {
            sock.send(JSON.stringify(response));
        })
    })

    socket.on("close",() => {
    const i = sockets.indexOf(socket)
    sockets.splice(i,1)
    console.log("all conections: ",sockets.length)

    const response = { 
        chat: chat,
        users: sockets.length
    }
    sockets.forEach((sock) => {
        sock.send(JSON.stringify(response));
    })
    })
})

wss.on("close",() => {
    console.log("Closed!")
})
wss.on("error",() => {
    console.log("Error!")
})


server.listen(8443, () => {
  console.log(`Server running on https://knilchon.mywire.org`);
})

server_https.listen(443, () => {
  console.log('Running!')
})
