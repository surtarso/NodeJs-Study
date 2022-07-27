import { Request, Response, NextFunction, Router } from "express";
import { StatusCodes } from 'http-status-codes';

const statusRoute = Router();


statusRoute.get('/status', (req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCodes.OK).send({ status: 'çuçeço!' });
});

export default statusRoute;