import createConnection from '../database';
import { getConnection } from 'typeorm';
import { CreateUserController } from './CreateUserController';
import { Request } from 'express'
// import { makeMockRequest } from '../utils/mocks/mockRequest';
import { makeMockResponse } from '../utils/mocks/mockResponse';


describe('CreateUserController', () => {

    beforeAll(async () => {
        const connection = await createConnection()
        await connection.runMigrations()
    })

    afterAll(async () => {
        const connection = getConnection()
        await connection.query('DELETE FROM usuarios')
        await connection.close()
    })

    const createUserController = new CreateUserController();
    const response = makeMockResponse()

    it('deve retornar status 201 qnd usuario for criado', async () => {
        const request = {
            body: {
                nome: 'algum usuario',
                email: 'email@email.com'
            }
        } as Request
        await createUserController.handle(request,response)
        expect(response.state.status).toBe(201)
    })

    it('deve retornar status 400 qnd um nome nao for informado', async () => {
        const request = {
            body: {
                nome: '',
                email: ''
            }
        } as Request
        await createUserController.handle(request,response)
        expect(response.state.status).toBe(400)
    })

    it('deve retornar 201 qnd o email n for informado', async() => {
        const request = {
            body: {
                nome: 'algum usuario',
                email: ''
            }
        } as Request
        await createUserController.handle(request,response)
        expect(response.state.status).toBe(201)
    })
})