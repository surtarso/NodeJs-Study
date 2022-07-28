import express from 'express';
import errorHandler from './middlewares/error-handler.middleware';
import authorizationRoute from './routes/authorization.route';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';
import jwtAuthenticationMiddleware from './middlewares/jwt-authentication.middleware';

//cria uma instancia do express
const app = express();

//configuracoes do app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use(statusRoute);
app.use(authorizationRoute);

//authenticated routes
app.use(jwtAuthenticationMiddleware);
app.use(usersRoute);

//error handlers
app.use(errorHandler);

//inicializacao do servidor
app.listen(8000, () => {
    console.log('executei na porta 8000');
});