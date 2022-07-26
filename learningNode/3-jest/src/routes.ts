import { Router } from 'express'
import { UserController } from './controllers/userController';

const routes = Router();
const userController = new UserController

// GET
routes.get('/users', userController.listarUsuario)

//POST
routes.post('/users', userController.criarUsuario)

export { routes }


// GET - ler os dados
// POST - criar dados
// PUT/PATCH - editar dados
// DELETE - deletar dados