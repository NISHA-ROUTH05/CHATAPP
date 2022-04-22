const express = require('express')

const multer = require('multer')
const path = require('path')
const app = express()
app.set('view engine','ejs')

const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))



app.get('/', (req, res) => {
    res.sendFile(__dirname + 'public/index.html')
})
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'/uploadss')
    },
    filename: function(req, file, cb){
        cb(null, file.fieldename + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({storage: storage})
var multipleupload = upload.fields([{name: 'file'}])

app.get('/', (req, res) => {
    res.render(__dirname + '/index.html')
})
//exra
app.post('/upload',function(req,res)  {
    console.log(req.files)
    res.send({
        success: TransformStreamDefaultController,
        message:"file loaded"
    })
})
app.post('/upload', multipleupload,(req, res) => {
    if(req.files){
        console.log("file uploaded")
        console.log(req.files)
    }
});
 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})

