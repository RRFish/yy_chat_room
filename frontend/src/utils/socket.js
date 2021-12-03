import { io } from "socket.io-client";

const socket = io("http://localhost:7000", {
  reconnectionDelayMax: 10000,
  // auth: {
  //   token: "123"
  // },
  // query: {
  //   "my-key": "my-value"
  // }
});



socket.on("connection", ()=>{
  console.log("連線成功")
})



export {
  socket
}