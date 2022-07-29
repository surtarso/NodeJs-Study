import { UpdateUserService } from "./UpdateUserService";
import { FakeData } from '../utils/mocks/fakeData/fakeData'
import createConnection from '../database'
import { getConnection } from 'typeorm'


describe('UpdateUserService', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations()
    })

    afterAll(async () => {
        const connection = getConnection()
        await connection.query('DELETE FROM usuarios')
        connection.close()
    })

    const fakeData = new FakeData();

    it('deve editar nome do usuario', async () => {

        const mockUser = await fakeData.createUser()
        const updateUserService = new UpdateUserService()

        const result = await updateUserService.execute({
            id: mockUser.id,
            nome: 'ainda outro nome'
        })

        expect(result).toHaveLength(0)

    })

})