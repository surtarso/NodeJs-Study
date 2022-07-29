import { GetAllUserController } from "./GetAllUserController";
import createConnection from "../database";
import { getConnection } from "typeorm";
import {FakeData} from '../utils/mocks/fakeData/fakeData'
import { makeMockRequest } from '../utils/mocks/mockRequest'
import { makeMockResponse } from '../utils/mocks/mockResponse'


describe('GetAllUserController', () => {
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
    it('deve retornar 200 qnd pegar todos os usuarios', async () => {
        await fakeData.execute()

        const getAllUserController = new GetAllUserController()
        const request = makeMockRequest({})
        const response = makeMockResponse()

        await getAllUserController.handle(request,response)

        expect(response.state.status).toBe(200)

    })
})
