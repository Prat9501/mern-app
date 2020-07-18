const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');
const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);
const PORT = process.env.PORT || 8000;

io.on('connection', socket => {
    console.log('User is connected', socket.id);
})

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

app.use(cors());
app.use(express.json());

try {
    mongoose.connect(process.env.MONGO_DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log('mongodb connected');
} catch (error) {
    console.log(error);
}

app.use("/files", express.static(path.resolve(__dirname, "..", "files")));
app.use(routes);

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})