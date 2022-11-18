import { ICreateCustomer } from "../../../interfaces/Customer/ICreateCustomer";
import { AppError } from "../../../shared/errors/AppError";
import { genSaltSync, hashSync } from "bcryptjs"
import { CustomerRepository } from "../typeorm/repository/CustomerRepository";
import { sign } from 'jsonwebtoken'
import { authConfig } from "../../../config/authConfig";
import { AccountRepository } from "../../accounts/typeorm/repositories/AccountRepository";
import { plainToClass } from "class-transformer";
import { Customer } from "../typeorm/entities/Customer";
export class CreateCustomer {

    public async execute({ username, password }: ICreateCustomer) {

        if (username.length < 3) {
            throw new AppError("Seu nome deve conter pelomenos 3 caracteres.")
        }

        const customerExists = await CustomerRepository.findByUsername(username);

        if (customerExists) {
            throw new AppError(`O usuário ${customerExists.username} já está cadastrado.`)
        }

        const salt = genSaltSync();
        const hashedPassword = hashSync(password, salt);

        const customer = await CustomerRepository.createCustomer({ username, password: hashedPassword });

        const account = await AccountRepository.createAccount(customer);

        customer.account = account;
        await CustomerRepository.associateAccount(customer, account);

        const token = sign({}, authConfig.jwt.customerSecret, {
            subject: JSON.stringify({
                customerId: customer.id,
                accountId: account.id
            }),
            expiresIn: authConfig.jwt.expiresIn
        })

        //@ts-expect-error 
        delete customer.account.customer;

        return { customer: plainToClass(Customer, customer), token }
    }
}