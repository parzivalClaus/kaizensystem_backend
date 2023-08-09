import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express'
import sessionService from '../services/sessionService';
import { IUser } from '../interfaces/userInterface';
import { IError } from '../interfaces/utilsInterface';
import authConfig from '../config/auth';

class SessionController {
    async store (req: Request, res: Response) {
        
        const user: IUser | IError = await sessionService.validate(req, res);

        if('error' in user) {
            return res.status(user.status).json({ error: user.error })
        }

        const { id, name } = user;
        const { email } = req.body;

        return res.json({
            user: {
            id,
            name,
            email,
            },
            token: jwt.sign({ id }, authConfig.secret, {
            expiresIn: authConfig.expiresIn,
            }),
        });
    }
}

export default new SessionController();