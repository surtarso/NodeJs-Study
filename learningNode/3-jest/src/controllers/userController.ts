import { Request, Response } from 'express'
import { database } from "../database"


export class UserController{
    //cria um novo usuario
    criarUsuario(request:Request, response:Response): Response{
        const { name } = request.body;
        
        //nao permite usuario em branco (vazio)
        if(name.length < 1){
            return response.status(403).json({'mensagem': 'usuario em branco'})
        }
        //adiciona a database
        database.push(name);
        return response.status(201).json({'mensagem': `usuario ${name} criado`})
    }

    //lista usuarios cadastrados
    listarUsuario(request:Request, response:Response): Response{
        return response.status(200).json(database)
    }
}