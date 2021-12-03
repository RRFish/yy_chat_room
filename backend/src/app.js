const express = require('express')
const app = express()
const port = 7000
const cors = require('cors')
const http = require('http')
const server = http.createServer(app);
const { Server } = require("socket.io")
const io = new Server(server, {origins:"*"})
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/login', (req, res) => {
    try{
        const data = req.body
        if(data.account=="user"&&data.password=="123456"){
            res.send({
                account:"test",
                passwod:"12345",
                token:"123456"
            })
            return
        }
        throw "帳密錯誤"
    }catch(err){
        console.log("err", err)
        res.statusCode  = 400
        res.send({
            message: err.toString()
        })
    }

})

io.on('connection', (socket) => {
    console.log('a user connected');
})
  

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})