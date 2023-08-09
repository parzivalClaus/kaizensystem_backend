import { Request } from 'express';

declare module 'express' {
    interface Request {
        userId?: string; // Substitua pelo tipo correto, se necessário
    }
}