import { dataSource } from "../../../../shared/typeorm/connection";
import { Customer } from "../../../customers/typeorm/entities/Customer";
import { Account } from "../entities/Account";

export class AccountRepository {
    static readonly accountRepository = dataSource.getRepository(Account);

    static async findById(accountId: number): Promise<Account | null> {
        const account = await this.accountRepository.findOne({
            where: { id: accountId }
        })

        return account;
    }

    static async findByCustomer(customer: Customer): Promise<Account | null> {
        const account = await this.accountRepository.findOne({
            where: {
                customer
            }
        });

        return account;
    }

    static async createAccount(customer: Customer): Promise<Account> {

        const valueInCents = 100 * 100

        const account = this.accountRepository.create({
            balance: valueInCents,
            customer: customer,
        })

        await this.accountRepository.save(account);

        const newAccount = {
            id: account.id,
            balance: account.balance,
            transactions: account.transactions,
            createdAt: account.createdAt,
            customer
        }

        return newAccount;
    }
}