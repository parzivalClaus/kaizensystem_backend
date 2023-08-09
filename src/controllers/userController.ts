import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import userService from '../services/userService';
import { IError } from '../interfaces/utilsInterface';

const prisma = new PrismaClient()

class UserController {

    async index (req: Request, res: Response) {
        const users = await prisma.user.findMany()
        res.json(users);
    }
    
    async store (req: Request, res: Response) {
        
    const isValid: IError | undefined = await userService.validate(req, res);

    if(isValid) {
        return res.status(isValid.status).json({ error: isValid.error })
    }

        const { name, email, password } = req.body;

        const hashedPassword = await userService.createPasswordHash(password);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
    
        res.json(newUser);
    }
}

export default new UserController();