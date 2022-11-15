import { dataSource } from "../../../../shared/typeorm/connection";
import { Account } from "../../../accounts/typeorm/entities/Account";
import { Transactions } from "../entities/Account";

export class TransactionsRepository {
    static readonly transactionsRepository = dataSource.getRepository(Transactions);

    static async findByAccount(account: Account): Promise<Transactions[]> {
        const accountTransactions = await this.transactionsRepository.find({
            where: [
                { debitedAccount: account },
                { creditedAccount: account }
            ]
        })

        return accountTransactions;

    }
}