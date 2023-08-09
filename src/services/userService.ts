import { PrismaClient } from '@prisma/client'
import * as Yup from 'yup'
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient()

class UserService { 
    async validate(req: Request, res: Response) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
            .email()
            .required(),
            password: Yup.string()
            .required()
            .min(6),
        });

        if (!(await schema.isValid(req.body))) {
            return { status: 400, error: 'Validation Fails' };
        }

        const userExists = await prisma.user.findUnique({ where: { email: req.body.email } });

        if (userExists) {
            return { status: 400, error: 'User already exists' };
        }
    }

    async createPasswordHash(password: string) {
        const passwordHash = await bcrypt.hash(password, 8);

        return passwordHash
    }
}

export default new UserService();