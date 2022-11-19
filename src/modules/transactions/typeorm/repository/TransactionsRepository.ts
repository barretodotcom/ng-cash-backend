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

    static async findAllUserTransactions(account: Account): Promise<Transactions[]> {

        const allUserTransactions = await this.transactionsRepository.query(`
        SELECT
            t.id,
            c.username as "debitedAccountUsername",
            c2.username  as "creditedAccountUsername",
            t."debitedAccountId" ,
            t."creditedAccountId" ,
            t.balance,
            t."createdAt"
        FROM
            account a
        INNER JOIN transactions t 
        ON
            a.id = t."debitedAccountId"
        INNER JOIN customer c 
        ON
            c.id = t."debitedAccountId" 
        INNER JOIN customer c2 
        ON
            c2.id = t."creditedAccountId"
            
        where 
        t."creditedAccountId" =$1 or t."debitedAccountId" =$1
        `, [account.id]);

        return allUserTransactions;
    }
}