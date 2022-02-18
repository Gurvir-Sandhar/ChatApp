require("dotenv").config();
const Socket = require("socket.io");
const cors = require('cors');
const express = require('express');
const app = express();
const http = require('http');
const port =  process.env.PORT || 5000;

const server = http.createServer(app);
const io = Socket(server, {
    cors: {
        origin: '*'
    }
});

const userList = [];

//mongoose code
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection;

db.on('connected', () => {
    console.log("Connected to MongoDB");
})
db.on('disconnected',() => {
    console.log("Disconnected to MongoDB")
})
db.on('error', (err) => {
    console.log(`Connection Error: ${err}`);
})


//middleware 
app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());


//mongoose models
let User = require('./models/userModel.js');
const { info } = require("console");


//routes
app.post('/login', (req,res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })
    User.countDocuments({username: user.username, password: user.password}, (err, count) => {
        if(count > 0){
            console.log("user data already exists")
        } else {
            user.save();
        }
        userList.push(req.body.username);
        res.send(true);
    })
})


server.listen(port, () => {
    console.log(`Listening on Port: ${port} `);
})


//socket stuff
io.on("connection", (socket) => {
    console.log(socket.id + " connected")
    socket.on('message', msg => {
        console.log(msg)
        socket.broadcast.emit("userMessage", msg);
    })
})  

io.on('disconnect', (socket) => {
    console.log(socket.id + "disconnected")
})
