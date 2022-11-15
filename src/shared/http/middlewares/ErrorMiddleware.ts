import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors/AppError";

export function errorMiddleware(error: Error, request: Request, response: Response, next: NextFunction) {
    if (error instanceof AppError) {
        return response.status(error.code).json({
            status: 'error',
            message: error.message,
            code: error.code
        });
    }

    return response.status(400).json({
        status: 'error',
        message: 'Ocorreu um erro interno, já estamos trabalhando nisso!'
    })

}