import {Request, Response } from 'express'
import { UpdateUserService } from '../services/UpdateUserService'


class UpdateUserController{
    async handle(request:Request, response:Response){
        
        const updateUserService = new UpdateUserService()
        const {id, nome, email } = request.body

        if ( id.length === 0){
            return response.status(400).json({mensagem: 'id nao informada'})
        }
        if ( nome.length === 0){
            return response.status(400).json({mensagem: 'nome nao informada'})
        }

        await updateUserService.execute({ id, nome, email })

        return response.status(204).json()

    }

}

export { UpdateUserController }