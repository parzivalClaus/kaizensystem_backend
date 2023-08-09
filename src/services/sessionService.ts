import { PrismaClient } from '@prisma/client'
import * as Yup from 'yup'
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient()

class SessionService { 
    async checkPassword(password: string, userPassword: string) {
        return await bcrypt.compare(password, userPassword);
    }

    async validate(req: Request, res: Response) {
        const schema = Yup.object().shape({
            email: Yup.string()
            .email()
            .required(),
            password: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return { status: 400, error: 'Validation Fails' };
        }

        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return { status: 400, error: 'User not found' };
        }

        const passwordMatch = await this.checkPassword(password, user.password)

        if (!passwordMatch) {
            return { status: 400, error: 'The password does not match' };
        }

        return user;
    }
}

export default new SessionService();