import { ICreateCustomer } from "../../../../interfaces/Customer/ICreateCustomer";
import { dataSource } from "../../../../shared/typeorm/connection"
import { Account } from "../../../accounts/typeorm/entities/Account";
import { AccountRepository } from "../../../accounts/typeorm/repositories/AccountRepository";
import { Customer } from "../entities/Customer"



export class CustomerRepository {

    static customerRepository = dataSource.getRepository(Customer)

    static async findall(): Promise<Customer[] | null> {
        const customer = await this.customerRepository.find()

        return customer;
    }

    static async findById(id: number): Promise<Customer | null> {
        const customer = await this.customerRepository.findOneBy({ id })

        return customer;
    }

    static async findByUsername(username: string): Promise<Customer | null> {
        const customer = await this.customerRepository.findOne({
            where: {
                username
            }
        })

        return customer;
    }

    static async deleteById(id: number) {
        await this.customerRepository.delete({ id })
    }

    static async createCustomer({ username, password }: ICreateCustomer): Promise<Customer> {

        const customer = this.customerRepository.create({ username, password });

        await this.customerRepository.save(customer);

        return customer;
    }

    static async associateAccount(customer: Customer, account: Account): Promise<void> {
        customer.account = account;
        await this.customerRepository.save(customer);
    }

    static async findByAccount(account: Account): Promise<Customer> {

        const customer = await this.customerRepository
            .createQueryBuilder('customer')
            .where('customer."accountId" = :id', { id: account.id })
            .getOne() as Customer;
        customer.account = account;

        return customer as Customer;
    }

}