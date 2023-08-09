import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { IError } from '../interfaces/utilsInterface';
import registerService from '../services/registerService';

const prisma = new PrismaClient()

class RegisterController {
    async index (req: Request, res: Response) {
        const registers = await prisma.register.findMany()
        res.json(registers);
    }
    
    async store (req: Request, res: Response) {
        
    const isValid: IError | undefined = await registerService.validate(req, res);

    if(isValid) {
        return res.status(isValid.status).json({ error: isValid.error })
    }

        const { value, description } = req.body;

        const newRegister = await prisma.register.create({
            data: {
                value,
                description,
            }
        })
    
        res.json(newRegister);
    }
}

export default new RegisterController();