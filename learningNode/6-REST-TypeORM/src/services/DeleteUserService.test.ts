import { FakeData } from '../utils/mocks/fakeData/fakeData'
import createConnection from '../database'
import { getConnection } from 'typeorm'
import { DeleteUserService } from './DeleteUserService'


describe('DeleteUserService', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations()
    })

    afterAll(async () => {
        const connection = getConnection()
        connection.close()
    })

    const fakeData = new FakeData();

    it('deve retornar um array vazio quando usuario deletar', async () => {
        
        const mockUser = await fakeData.createUser()

        const deleteUserService = new DeleteUserService()

        const result = await deleteUserService.execute({ id: mockUser.id })

        expect(result).toHaveLength(0)
    })

})