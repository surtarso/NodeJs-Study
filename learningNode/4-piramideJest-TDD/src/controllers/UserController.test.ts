import { UserController } from './UserController'
import { makeMockRequest } from '../__mocks__/mockRequest'
import { makeMockResponse } from '../__mocks__/mockResponse'
import { Request } from 'express'
import { getMockUser } from '../__mocks__/mockUser'
import { User } from '../entities/User'
import { response } from 'express'

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
    
    const request = {
        body: {
            name: 'teste nome',
            email: 'teste@email.com'
        }
    } as Request

    const response = makeMockResponse()
    it('retornar 201 e usuario criado', async () => {
        jest.fn().mockImplementation(() => Promise.resolve(mockUser))
        await userController.createUser(request,response)
        expect(response.state.status).toBe(201)
        expect(response.state.json).toHaveProperty('user_id')
        expect(response.state.json).toMatchObject({
            name: 'teste nome',
            email: 'teste@email.com'
        })
    })

    it('deve retornar status 400 qnd usuario n der name email', async () => {
        const request = {
            body: {
                name: '',
                email: ''
            }
        } as Request
        await userController.createUser(request,response)
        expect(response.state.status).toBe(400)
    })
})