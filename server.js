
const express = require('express');
const app = express();
const port =  process.env.PORT || 5000;

app.get('/express_backend', (req,res) => {
    res.send({express: 'your backend is connected to react'})
})

app.listen(port, () => {
    console.log(`Listening on Port: ${port} `);
})