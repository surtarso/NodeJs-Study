import { Request } from 'express';
import { makeMockResponse } from '../mocks/mockResponse';
import { UserController } from "./userController";

describe('User Controller', () => {
    const userController = new UserController();
    const mockRequest = {} as Request;
    const mockResponse = makeMockResponse()

    it('deve listar nossos usuarios', () => {
        userController.listarUsuario(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toHaveLength(3)
    })

    it('deve criar um novo usuario', () => {
        mockRequest.body = {
            'name' : 'novo usuario'
        }

        userController.criarUsuario(mockRequest,mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({'mensagem': `usuario novo usuario criado`})
    })

    it('nao deve criar usuario em branco', () => {
        mockRequest.body = {
            'name': ''
        }

        userController.criarUsuario(mockRequest,mockResponse)
        expect(mockResponse.state.status).toBe(403)
        expect(mockResponse.state.json).toMatchObject({'mensagem': 'usuario em branco'})
    })

})








// THE IDEA:
// describe('testar soma', () => {
//     it('deve somar 1 + 1', () => {
//         function soma (a: number, b: number){
//             return a + b
//         }
//         const resultado = soma(1,2)
//         expect(resultado).toBe(3)
//     })
// })