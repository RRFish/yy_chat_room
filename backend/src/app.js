const express = require('express')
const app = express()
const port = 7000
const cors = require('cors')
const http = require('http')
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const server = http.createServer(app);
const { tokenCreate, authenticationMiddleware } = require("./utils/token.js")

const { query } = require("./utils/db.js")
const { YyResponse } = require("./utils/response.js")
const { fileSave, fileSqlTypeGet } = require("./utils/uploadFile.js")
const { socketInit, socketEmit } = require("./utils/socket.js")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

app.use(express.static(path.join(__dirname, 'uploads')));

app.use(authenticationMiddleware)


app.post('/login', async (req, res) =>  {
    try{
        const data = req.body
        console.log("data", data)
        if(data.account&&data.password){
            const result = await query("select user_id, account, nickname, password from user where account=? and password=?;", [data.account, data.password]);
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


app.post('/chat_file_upload', async (req, res) =>  {
    try{
        const data = res.locals.user
        const member = await query("select * from user where account=?;",[data.username])
        const filePath = await fileSave(req.files.file, req.body.fileName)
        const fileType = fileSqlTypeGet(req.files.file)

        console.log("資料", member[0].user_id, filePath, fileType)
        await query("insert into chat_message (user_id, message, type) values (?, ?, ?);",[member[0].user_id, filePath, fileType])
        socketEmit("chat message", {
            user_id: member[0].user_id,
            account: member[0].account,
            message: filePath,
            type: fileType
        })        
        
        res.send(new YyResponse(200, false))
    }catch(err){
        console.log("err", err)
        res.send(new YyResponse(400, false))        
    }

})

socketInit(server)

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})