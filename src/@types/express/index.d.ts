declare namespace Express {
    export interface Request {
        customer: {
            customerId,
            accountId
        },
    }
}