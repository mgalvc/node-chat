let app = require('express')()
let http = require('http').createServer(app)
let io = require('socket.io')(http)
const moment = require('moment')

app.get('/', (req, res) => {
    res.send('response from docker server baby yeah')
})

io.on('connection', (socket) => {
    console.log('someone connected')
    socket.on('message', msg => {
        console.log(`${msg.from} said ${msg.content}`)
        socket.broadcast.emit('message', msg)
    })
})

http.listen(3000, () => {
    console.log('listening on *:3000')
})