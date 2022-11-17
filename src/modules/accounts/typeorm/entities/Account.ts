import { Column, Entity, PrimaryGeneratedColumn, OneToOne, OneToMany, CreateDateColumn, JoinColumn } from "typeorm";
import { Customer } from "../../../customers/typeorm/entities/Customer";
import { Transactions } from "../../../transactions/typeorm/entities/Account";

@Entity('account')
export class Account {

    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column({ type: "bigint" })
    balance: number;

    @OneToOne(type => Customer, customer => customer.account)
    @JoinColumn()
    customer: Customer;

    @OneToMany(type => Transactions, transaction => transaction.debitedAccount, { eager: true })
    @JoinColumn()
    debitedTransactions: Transactions[]

    @OneToMany(type => Transactions, transaction => transaction.creditedAccount, { eager: true })
    @JoinColumn()
    creditedTransactions: Transactions[]

    @CreateDateColumn()
    createdAt: Date;
}