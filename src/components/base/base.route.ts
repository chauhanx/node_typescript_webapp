import express, { Request, Response } from 'express';

export const baseRouter = express.Router();

baseRouter.get('/health', async ( req: Request, res: Response,next) => {
    try {
        res.status(200).send("Health OK!!!");
    }catch (e) {
        res.status(500).send(e);
    }
});

