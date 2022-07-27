import { Request, Response } from 'express'

class MessageController {
  async handle (request: Request, response: Response) {
    return response.status(200).json({ message: 'Welcome to TestsAPI' })
  }
}

export { MessageController }
