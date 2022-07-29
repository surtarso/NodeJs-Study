import createConnection from "../database"
import {getConnection} from 'typeorm'
import { GetAllUserService} from './GetAllUserService'
import { CreateUserService} from './CreateUserService'
import { FakeData } from '../utils/mocks/fakeData/fakeData'

describe('GetAllUserService', () => {
    beforeAll(async () =>{
        const connection = await createConnection();
        await connection.runMigrations
    })

    afterAll(async() => {
        const connection = getConnection();
        await connection.query('DELETE FROM usuarios')
        await connection.close()
    })

    const createUserService = new CreateUserService();
    const fakeData = new FakeData();

    it('deve retornar todos os usuarios cadastrados', async() => {
        await fakeData.execute()

        const expectedResponse = [
            {
                nome: 'algum nome',
                email: 'algumemail@email.com'
            },
            {
                nome: 'outro nome',
                email: ''
            }
        ]

        const getAllUserService = new GetAllUserService();
        const result = await getAllUserService.execute();

        expect(result).toMatchObject(expectedResponse)
    })
})