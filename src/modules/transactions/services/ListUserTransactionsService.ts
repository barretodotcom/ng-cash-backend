import { plainToClass } from "class-transformer";
import { AppError } from "../../../shared/errors/AppError";
import { AccountRepository } from "../../accounts/typeorm/repositories/AccountRepository";
import { Customer } from "../../customers/typeorm/entities/Customer";
import { CustomerRepository } from "../../customers/typeorm/repository/CustomerRepository";
import { Transactions } from "../typeorm/entities/Account";
import { TransactionsRepository } from "../typeorm/repository/TransactionsRepository";

interface ITransactions {
    customer: Customer;
    allAccountTransactions: Transactions[];
}

export class ListUserTransactionsService {
    public async execute(accountId: number): Promise<ITransactions> {
        const account = await AccountRepository.findById(accountId);

        if (!account) {
            throw new AppError("Conta não encontrada.");
        }

        const allAccountTransactions = await TransactionsRepository.findAllUserTransactions(account);
        const customer = await CustomerRepository.findByAccount(account);
        console.log(customer);

        return { customer: plainToClass(Customer, customer), allAccountTransactions };
    }
}