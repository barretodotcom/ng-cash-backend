import { AppError } from "../../../shared/errors/AppError";
import { CustomerRepository } from "../typeorm/repository/CustomerRepository";
import { compareSync } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { authConfig } from "../../../config/authConfig";
import { plainToClass } from "class-transformer";
import { Customer } from "../typeorm/entities/Customer";

interface ICustomerSession {
    username: string;
    password: string;
}

export class CustomerSession {
    public async execute({ username, password }: ICustomerSession) {
        const customerExists = await CustomerRepository.findByUsername(username);

        if (!customerExists) {
            throw new AppError(`O usuário ${username} não existe.`)
        }

        if (!compareSync(password, customerExists.password)) {
            throw new AppError("Seu nome de usuário ou senha estão inválidos.")
        }

        const token = sign({}, authConfig.jwt.customerSecret, {
            subject: JSON.stringify({
                customerId: customerExists.id,
                accountId: customerExists.account.id
            }),
            expiresIn: authConfig.jwt.expiresIn
        })

        return { customer: plainToClass(Customer, customerExists), token };
    }
}