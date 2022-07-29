import 'reflect-metadata';
import express from 'express';
import { router } from './routes';
import createConnection from './database';

//conecta com servidor
createConnection();
//inicializa o express (server)
const server = express();
//server config
const PORT = 8000;
server.use(express.json());

//routes
server.use(router);


server.listen(PORT, () => {
    console.log('servidor on na porta:', PORT)
})


