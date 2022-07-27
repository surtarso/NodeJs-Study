import { makeMockResponse } from '../__mocks__/mockResponse'
import { makeMockRequest } from '../__mocks__/mockRequest'
import { MessageController } from './MessageController'

//faz referencia ao teste unitario do controller

describe('MessageController', () => {
  it('Should show a welcome message', async () => {
    const messageController = new MessageController()

    const request = makeMockRequest({})

    const response = makeMockResponse()

    await messageController.handle(request, response)

    expect(response.state.status).toBe(200)
    expect(response.state.json).toEqual({
      message: 'Welcome to TestsAPI'
    })
  })
})
