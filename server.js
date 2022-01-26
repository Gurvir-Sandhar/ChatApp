
require("dotenv").config();
const cors = require('cors');
const express = require('express');
const app = express();
const port =  process.env.PORT || 5000;

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection;

//connect to database
db.on('connected', () => {
    console.log("Connected to MongoDB");
})
db.on('disconnected',() => {
    console.log("Disconnected to MongoDB")
})
db.on('error', (err) => {
    console.log(`Connection Error: ${err}`);
})

app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

let User = require('./models/userModel.js');
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
    })
})

app.listen(port, () => {
    console.log(`Listening on Port: ${port} `);
})