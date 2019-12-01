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

const app = express();
// Server
app.use(cors());
app.use('/graphql', graphqlHTTP({ schema }));

app.listen(43500, function () {
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
