import { AppError } from "../../../shared/errors/AppError";
import { AccountRepository } from "../../accounts/typeorm/repositories/AccountRepository";
import { CustomerRepository } from "../../customers/typeorm/repository/CustomerRepository";
import { TransactionsRepository } from "../typeorm/repository/TransactionsRepository";

interface ITransactions {
    creditedCustomerUsername: string,
    debitedCustomerUsername: string,
    value: number;
}

export class ListUserTransactionsService {
    public async execute(accountId: number): Promise<ITransactions[]> {
        const account = await AccountRepository.findById(accountId);

        if (!account) {
            throw new AppError("Conta não encontrada.");
        }

        const findTransactions = await TransactionsRepository.findByAccount(account);

        const allTransactions: ITransactions[] = [];

        findTransactions.forEach(transaction => {
            const creditedCustomerUsername = transaction.creditedAccount.customer.username;
            const debitedCustomerUsername = transaction.debitedAccount.customer.username;
            const value = transaction.balance;
            allTransactions.push({
                creditedCustomerUsername,
                debitedCustomerUsername,
                value
            })
        })

        return allTransactions;
    }
}