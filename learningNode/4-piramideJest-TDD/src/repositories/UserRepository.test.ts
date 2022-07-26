
import { User } from '../entities/User'
import getEntityManagerMock from '../__mocks__/getEntityManagerMock'
import {UserRepository} from './UserRepository'
import { v4 as uuid } from 'uuid'

describe('testar user repository', () => {

    //mock a user
    const mockUser: User = {
        user_id: uuid(),
        name: 'nome teste',
        email: 'email@teste.com'
    }


    it('deve retornar o usuario salvo quando chamar a funcao save', async () => {
        const managerMock = await getEntityManagerMock({
            saveReturn: mockUser  //resultado é o usuario mockado
        })
    
        const userRepository = new UserRepository(managerMock)
        const user = await userRepository.save(mockUser)

        //testa as propriedades explicitas do objeto usuario mockado
        expect(user).toHaveProperty('user_id')
        expect(user).toMatchObject({
            name: 'nome teste',
            email: 'email@teste.com'
        })
    })
})