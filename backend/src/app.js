const express = require('express')
const app = express()
const port = 7000

app.post('/login', (req, res) => {
    console.log("req", req, req.params)
    res.send({
        account:"test",
        passwod:"12345",
        token:"123456"
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})