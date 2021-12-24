const { Server } = require("socket.io")
const { query } = require("./db.js")
var io

function socketInit(server) {
    io = new Server(server, {
        cors: {
          origin: '*',
        }
    })
    io.on('connection', (socket) => {
        socket.on('chat message', async (data) => {
            await query("insert into chat_message (user_id, message, type) values(?, ?, ?);", [data.user_id, data.message, data.type]);
            socketEmit('chat message', data)
        });
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    })
          
}

function socketEmit(event, data){
    io.sockets.emit("chat message", data)    
}



module.exports = {
    socketInit: socketInit,
    socketEmit: socketEmit
}