import { Column, Entity, PrimaryGeneratedColumn, OneToOne, OneToMany, CreateDateColumn, JoinColumn } from "typeorm";
import { Customer } from "../../../customers/typeorm/entities/Customer";
import { Transactions } from "../../../transactions/typeorm/entities/Account";

@Entity('account')
export class Account {

    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column({ type: "real" })
    balance: number;

    @OneToOne(type => Customer, { eager: false })
    @JoinColumn()
    customer: Customer;

    @OneToMany(type => Transactions, transaction => transaction)
    transactions: Transactions[]

    @CreateDateColumn()
    createdAt: Date;
}