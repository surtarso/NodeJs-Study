
import { createConnection, getConnection } from "typeorm";
import {FakeData} from '../utils/mocks/fakeData/fakeData'
import { makeMockResponse } from '../utils/mocks/mockResponse'
import { makeMockRequest } from '../utils/mocks/mockRequest'
import { Request } from "express";
import { DeleteUserController} from "./DeleteUserController";


describe('DeleteUserController', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations()
    })

    afterAll(async () => {
        const connection = getConnection()
        connection.close()
    })

    const fakeData = new FakeData()

    it('deve retornar 204 qnd usuario for deletado', async () => {
        const mockUser = await fakeData.createUser()
        const deleteUserController = new DeleteUserController()
        const request = makeMockRequest({
            params: {
                id: mockUser.id
            }
        })
        const response = makeMockResponse()

        await deleteUserController.handle(request,response)

        expect(response.state.status).toBe(204)
    })

})