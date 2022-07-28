import { Request, Response, NextFunction } from "express";
import ForbiddenError from "../models/errors/forbiddenError.model";
import JWT from 'jsonwebtoken';


async function jwtAuthenticationMiddleware(req:Request, res:Response, next:NextFunction){
    try {
        const authorizarionHeader = req.headers['authorization'];
        
        //verifica se header nao existe
        if ( !authorizarionHeader ){
            throw new ForbiddenError('credencial nao informada');
        }

        //caso exista:
        const [ authType, token ] = authorizarionHeader.split(' ');

        //checa se veio certo (bearer + hash)
        if ( authType !== 'Bearer' || !token ){
            throw new ForbiddenError('tipo de autenticacao invalida');
        }

        try {
            //verifica se o token eh valido
            const tokenPayload = JWT.verify(token, 'my_hash');

            if (typeof tokenPayload !== 'object' || !tokenPayload.sub){
                throw new ForbiddenError('token invalido');
            }

            const user = {
                uuid: tokenPayload.sub,
                username: tokenPayload.username
            };

            req.user = user;
            next();
            
        } catch (error) {
            throw new ForbiddenError('token invalido');
        }

    } catch (error) {
        next(error);
    }
}

export default jwtAuthenticationMiddleware;