import * as Yup from 'yup'
import { Request, Response } from 'express'

class RegisterService { 
    async validate(req: Request, res: Response) {
        const schema = Yup.object().shape({
            value: Yup.number().required(),
            description: Yup.string()
            .required(),
        });

        if (!(await schema.isValid(req.body))) {
            return { status: 400, error: 'Validation Fails' };
        }
    }
}

export default new RegisterService();