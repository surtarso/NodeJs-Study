import { UserController } from './UserController'
import { makeMockRequest } from '../__mocks__/mockRequest'
import { makeMockResponse } from '../__mocks__/mockResponse'
import { getMockUser } from '../__mocks__/mockUser'
import { User } from '../entities/User'

const mockUser: User = getMockUser()

jest.mock('../services/UserService', () => {
    return {
        UserService: jest.fn().mockImplementation(() => {
            return {
                createUser: jest.fn().mockImplementation(() => Promise.resolve(mockUser))
            }
        })
    }
})


describe('user controller', () => {
    const userController = new UserController()

    it('retornar 201 e usuario criado', async () => {
        const request = makeMockRequest({
            body: {
                name: 'teste nome',
                email: 'teste@email.com'
            }
        })
        
        const response = makeMockResponse()
        await userController.createUser(request,response)
        expect(response.state.status).toBe(201)
        expect(response.state.json).toHaveProperty('user_id')
        expect(response.state.json).toMatchObject({
            name: 'teste nome',
            email: 'teste@email.com'
        })
    })
})