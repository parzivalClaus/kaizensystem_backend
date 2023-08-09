import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import userService from '../services/userService';
import { IError } from '../interfaces/utilsInterface';
import { IUser } from '../interfaces/userInterface';

const prisma = new PrismaClient()

class UserController {

    async index (req: Request, res: Response) {
        const users = await prisma.user.findMany()
        res.json(users.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
        })));
    }

    async find (req: Request, res: Response) {
        const { id } = req.params; 
        
        const user: IError | IUser = await userService.validateExistsById(+id, req, res);

        if('error' in user) {
            return res.status(user.status).json({ error: user.error })
        }

        const newUser = {
            id: user.id,
            name: user.name,
            email: user.email,
        }

        res.json(newUser);
        
    }
    
    async store (req: Request, res: Response) {
        
    const notValid: IError | undefined = await userService.validate(req, res);

    if(notValid) {
        return res.status(notValid.status).json({ error: notValid.error })
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
    
        res.json({name: newUser.name, email: newUser.email, id: newUser.id});
    }

    async delete (req: Request, res: Response) {
        const { id } = req.params; 
        
        const user: IError | IUser = await userService.validateExistsById(+id, req, res);

        if('error' in user) {
            return res.status(user.status).json({ error: user.error })
        }

       try {
        await prisma.user.delete({
            where: { id: +id }
        })

        res.status(200).json({ success: 'User deleted.'});
       } catch (error) {
        return res.status(500).json({ error})
       }
        
    }
}

export default new UserController();