import { io } from "socket.io-client";
import store from "@/store"
const socket = io("http://localhost:7000");


socket.on("chat message", (data)=>{
  console.log("data", data)
  store.dispatch("chatMessagePush",data)
})

function sendMessageSocket(message){
  socket.emit('chat message', {
    user_id: store.state.userinfo.user_id,
    message: message,
    type: 0
  });

}


export {
  sendMessageSocket
}