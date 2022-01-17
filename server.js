
require("dotenv").config();
const express = require('express');
const app = express();
const port =  process.env.PORT || 5000;



const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)

mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB");
})
mongoose.connection.on('error', (err) => {
    console.log(`Connection Error: ${err}`);
})

app.get('/express_backend', (req,res) => {
    res.send({express: 'your backend is connected to react'})
})


app.listen(port, () => {
    console.log(`Listening on Port: ${port} `);
})