import { createConnection, getConnection } from "typeorm";
import { UpdateUserController } from "./UpdateUserController";
import {FakeData} from '../utils/mocks/fakeData/fakeData'
import { makeMockResponse } from '../utils/mocks/mockResponse'
import { Request } from "express";

describe('UpdateUserController', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations()
    })

    afterAll(async () => {
        const connection = getConnection()
        await connection.query('DELETE FROM usuarios')
        connection.close()
    })

    const fakeData = new FakeData()

    it('deve retornar status 204 qnd usuario for editado', async () => {
        
        const mockUser = await fakeData.createUser()

        const updateUserController = new UpdateUserController()

        const request = {
            body: {
                id: mockUser.id,
                nome: 'joao ze',
                email: 'email@davez.com'
            }
        } as Request

        const response = makeMockResponse()

        await updateUserController.handle(request,response)

        expect(response.state.status).toBe(204)
    })
})