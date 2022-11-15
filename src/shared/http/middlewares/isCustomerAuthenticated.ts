import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { JsonWebTokenError, JwtPayload, verify } from 'jsonwebtoken';
import { authConfig } from "../../../config/authConfig";

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

interface ISubject {
    customerId: number;
    accountId: number
}

export default function isCustomerAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("JWT Token indefinido.")
    }

    const [Bearer, token] = authHeader.split(' ')

    try {
        const decodedToken = verify(token, authConfig.jwt.customerSecret);

        let { sub } = decodedToken as ITokenPayload;
        const subjectData = JSON.parse(sub) as ISubject;

        request.customer = {
            customerId: subjectData.customerId,
            accountId: subjectData.accountId
        }
        return next();
    } catch {
        throw new AppError("Token inválido.")
    }
}