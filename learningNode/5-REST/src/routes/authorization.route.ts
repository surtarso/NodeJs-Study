import { Request, Response, NextFunction, Router } from "express";
import ForbiddenError from "../models/errors/forbiddenError.model";
import { StatusCodes } from 'http-status-codes';
import JWT from 'jsonwebtoken';
import basicAuthenticationMiddleware from "../middlewares/basic-authentication.middleware";
import jwtAuthenticationMiddleware from "../middlewares/jwt-authentication.middleware";

const authorizationRoute = Router();



authorizationRoute.post('/token/validate', jwtAuthenticationMiddleware, (req:Request, res:Response, next:NextFunction) => {
    res.sendStatus(StatusCodes.OK);
});


authorizationRoute.post('/token', basicAuthenticationMiddleware, async (req:Request, res:Response, next:NextFunction) =>{
    try{
        const user = req.user;

        if ( !user ){
            throw new ForbiddenError('usuario nao informado');
        }

        // "iss" dominio da aplicacao geradora de token
        // "sub" assunto do token, geralmente id do usuario
        // "aud" quem pode usar o token
        // "exp" data de expiracao do token
        // "nbf" data em q o token nao pode ser aceito antes dela
        // "iat" data de criacao do token
        // "jti" o id do token

        //gera o token
        const jwtPayload = { username: user.username };
        const jwtOptions = { subject: user?.uuid };
        const secretKey = 'my_hash';

        const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);

        res.status(StatusCodes.OK).json({ token: jwt });

    } catch (error) {
        next(error);
    }
});



export default authorizationRoute;