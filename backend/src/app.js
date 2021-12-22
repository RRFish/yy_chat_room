const express = require('express')
const app = express()
const port = 7000
const cors = require('cors')
const http = require('http')
const server = http.createServer(app);
const { tokenCreate, authenticationMiddleware } = require("./utils/token.js")
const { Server } = require("socket.io")
const { query } = require("./utils/db.js")
const { YyResponse } = require("./utils/response.js")
const io = new Server(server, {
    cors: {
      origin: '*',
    }
})
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(authenticationMiddleware)


app.post('/login', async (req, res) =>  {
    try{
        const data = req.body
        console.log("data", data)
        if(data.account&&data.password){
            const result = await query("select user_id, account, nickname, password from user where account=? and password=?;", [data.account, data.password]);
            console.log("result", result)
            const token = tokenCreate(result[0].account, result[0].password)
            if(result.length > 0) {
                res.send(new YyResponse(200, true, token))
                return
            }
        }
        throw "帳密錯誤"
    }catch(err){
        console.log("err", err)
        res.send(new YyResponse(400, false))        
    }

})

app.get('/userinfo', async (req, res) =>  {
    try{
        const data = res.locals.user
        const result = await query("select user_id, account, nickname from user where account=? and password=?;", [data.username, data.password]);        
        console.log("result", result)
        if(result.length > 0) {
            res.send(new YyResponse(200, true, result[0]))
            return
        }        
        
        throw "使用者不存在"
    }catch(err){
        console.log("err", err)
        res.send(new YyResponse(400, false))        
    }

})

app.post('/register', async (req, res) =>  {
    try{
        const data = req.body
        console.log("data", data)
        if(data.account&&data.password){
            const result = await query("select count(*) as count from user where account=?;", [data.account]);
            console.log("result", result)
            if(result[0].count <= 0) {
                await query("insert into user ( account, password, nickname) values (?, ?, ?);", [data.account, data.password, data.nickname]);
                res.send(new YyResponse(200, true, result[0]))
                return
            }
            throw "該用戶已存在"
        }
        throw "資料有誤請檢查"
    }catch(err){
        console.log("err", err)
        res.send(new YyResponse(400, false))        
    }

})

app.get('/chat_message', async (req, res) =>  {
    try{
        const result = await query("SELECT * FROM chat_message AS a join user AS b ON a.user_id = b.user_id;");
        res.send(new YyResponse(200, true, result))
        return
    }catch(err){
        console.log("err", err)
        res.send(new YyResponse(400, false))        
    }

})

io.on('connection', (socket) => {
    socket.on('chat message', async (data) => {
         io.sockets.emit("chat message", data)
        await query("insert into chat_message (user_id, message, type) values(?, ?, ?);", [data.user_id, data.message, data.type]);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})
  

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})