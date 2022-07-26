import express from 'express';
import { routes } from './routes';

const server = express();
const PORT = 8000;

server.use(express.json());
server.use(routes);

server.listen(PORT, () => {
    console.log(`server online on port:${PORT}`)
})