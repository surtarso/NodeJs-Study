import express from 'express';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

//configs do app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rotas
app.use(statusRoute);
app.use(usersRoute);

//inicializacao do servidor
app.listen(8000, () => {
    console.log('executei na porta 8000');
});