import express, { Request, Response, NextFunction } from 'express';

const app = express();

app.get('/status', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ foo: 'bar' });
});

app.listen(8000, () => {
    console.log('executei na porta 8000');
});