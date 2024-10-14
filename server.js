import express from "express"
import path from "path"

const server = express()

server.use(express.static('public'))  //config static folder



server.get('/', function (req, res) {
    res.sendFile(path.resolve("src", "views", "index.html"))
})








export {server}