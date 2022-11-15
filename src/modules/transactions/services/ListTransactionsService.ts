import { AppError } from "../../../shared/errors/AppError";
import { AccountRepository } from "../../accounts/typeorm/repositories/AccountRepository";
import { Transactions } from "../typeorm/entities/Account";
import { TransactionsRepository } from "../typeorm/repository/TransactionsRepository";

export class ListTransactionsServices {
    public async execute(accountId: number): Promise<Transactions[]> {

        const account = await AccountRepository.findById(accountId);

        if (!account) {
            throw new AppError("Conta não encontrada, não foi possível encontrar a transações.")
        }

        const accountTransactions = TransactionsRepository.findByAccount(account);

        return accountTransactions;
    }
}