import { Request, Response, NextFunction, Router } from "express";
import { StatusCodes } from 'http-status-codes';
import userRepository from "../repositories/user.repository";

const usersRoute = Router();

//-----------CREATE
usersRoute.post('/users', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser = req.body;
        const uuid = await userRepository.createUser(newUser)
        res.status(StatusCodes.CREATED).send(uuid);

    } catch (error){
        next(error);
    }
});

//-----------READ (all)
usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userRepository.findAllUsers();
        res.status(StatusCodes.OK).send( users );

    } catch (error){
        next(error);
    }
});
//-----------READ (one)
usersRoute.get('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
        const uuid = req.params.uuid;
        const user = await userRepository.findById(uuid);
        res.sendStatus(StatusCodes.OK).send(user);

    } catch (error){
        next(error);
    }
});

//----------UPDATE
usersRoute.put('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
        const uuid = req.params.uuid;
        const modifiedUser = req.body;
        modifiedUser.uuid = uuid;

        await userRepository.updateUser(modifiedUser);
        res.status(StatusCodes.CREATED).send();

    } catch (error){
        next(error);
    }
});

//----------DELETE
usersRoute.delete('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
        const uuid = req.params.uuid
        await userRepository.removeUser(uuid);
        res.sendStatus(StatusCodes.OK);
        
    } catch (error){
        next(error);
    }
});

export default usersRoute;