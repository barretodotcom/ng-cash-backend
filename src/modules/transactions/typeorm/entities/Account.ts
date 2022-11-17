import { Column, Entity, PrimaryGeneratedColumn, OneToOne, CreateDateColumn, ManyToOne } from "typeorm";
import { Account } from "../../../accounts/typeorm/entities/Account";

@Entity('transactions')
export class Transactions {

    @PrimaryGeneratedColumn('identity')
    id: string;

    @Column()
    balance: number;

    @ManyToOne(type => Account, account => account.debitedTransactions)
    debitedAccount: Account;

    @ManyToOne(type => Account, account => account.creditedTransactions)
    creditedAccount: Account;

    @CreateDateColumn()
    createdAt: Date;
}