import * as express from "express"
import { JwtPayload } from "jsonwebtoken"

interface Person{
    username: string,
    userId: string
    iat: string
}

declare global {
    namespace Express {
        interface Request {
            user? : any
        }
    }
}