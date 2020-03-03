/**
 *  Copyright (c) 2019 GraphQL Contributors.
 *
 *  This source code is licensed under the MIT license found in the
 *  LICENSE file in the root directory of this source tree.
 */
import express from 'express';
import path from 'path';
import graphqlHTTP from 'express-graphql';
import fs from 'fs';
import schema from './schema';
import cors from 'cors';
const socketIo = require("socket.io");

const app = express();
// Server
app.use(cors());
app.use('/graphql', graphqlHTTP({ schema }));

const server = app.listen(43500, function () {
    const port = this.address().port;
    console.log('PID', process.pid)
    fs.writeFile(path.join(__dirname, 'pid'), parseInt(process.pid, 10), () => {
        console.log(`Started on http://localhost:${port}/`);
    })
    process.once('SIGINT', () => {
        process.exit()
    })
    process.once('SIGTERM', () => {
        process.exit()
    })
});

const io = socketIo(server);
let interval;
let i = 0
const types = ["", "secondary", "success", "info", "warning", "danger"];
const randomType = () => types[(Math.floor(Math.random() * types.length))];
const getApiAndEmit = async socket => {
    try {
        socket.emit("notification", {
            message: "A little message for you.",
            title: "Message number " + (++i),
            type: randomType()
        });
    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
}

io.on("connection", socket => {
    console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 5000);
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});