import {UserService} from './UserService'
import { getMockUser } from '../__mocks__/mockUser'

//sobrescreve o mock real
jest.mock('../repositories/UserRepository')
//substitui pelo mockado
const mockUserRepository = require('../repositories/UserRepository')

describe('User Service', () => {
    const mockUser = getMockUser()

    const userService = new UserService({
        userRepository: mockUserRepository,
        name: 'teste nome',
        email: 'teste@email.com'
    })


    it('deve retornar um usuario quando foi salvo', async () => {
        mockUserRepository.save = jest.fn().mockImplementation(() => Promise.resolve(mockUser))
        const user = await userService.createUser()

        expect(user).toHaveProperty('user_id')
        expect(user).toMatchObject({
            name: 'teste nome',
            email: "teste@email.com"
        })
    })
}) 