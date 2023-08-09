export interface IAuth {
    secret: string,
    expiresIn: string,
}

export interface IError {
    status: number, 
    error: string
}