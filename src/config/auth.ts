import { IAuth } from "../interfaces/utilsInterface";

const authConfig: IAuth = {
    secret: process.env.APP_SECRET || '',
    expiresIn: '7d',
}

export default authConfig;