import { Response, Request, NextFunction } from "express";
import ForbiddenError from "../models/errors/forbiddenError.model";
import userRepository from "../repositories/user.repository";


async function basicAuthenticationMiddleware(req:Request, res:Response, next:NextFunction){
    try{
        const authorizarionHeader = req.headers['authorization'];

        //verifica se header nao existe
        if ( !authorizarionHeader ){
            throw new ForbiddenError('credencial nao informada');
        }

        //caso exista:
        const [ authType, token ] = authorizarionHeader.split(' ');

        //checa se veio certo (basic + hash)
        if ( authType !== 'Basic' || !token ){
            throw new ForbiddenError('autenticacao invalida');
        }

        //converte base64 token para utf-8 (hash to user:pass)
        const tokenContent = Buffer.from(token, 'base64').toString('utf-8');

        //separa user:senha
        const [ username, password ] = tokenContent.split(':');

        //checa se nao estao em branco
        if ( !username || !password ){
            throw new ForbiddenError('credenciais nao preenchidas');
        }

        //caso tudo ok, busca usuario no banco de dados
        const user = await userRepository.findByUsernamePassword(username, password);

        //se user n existir
        if ( !user ){
            throw new ForbiddenError('usuario ou senha invalidos');
        }

        //propaga o objeto user
        req.user = user;
        next(); //continua propagando qnd chamado sem error!

    } catch (error) {
        next(error);
    }
}

export default basicAuthenticationMiddleware;