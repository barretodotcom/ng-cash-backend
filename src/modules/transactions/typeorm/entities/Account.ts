import { Column, Entity, PrimaryGeneratedColumn, OneToOne, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Account } from "../../../accounts/typeorm/entities/Account";

@Entity('transactions')
export class Transactions {

    @PrimaryGeneratedColumn('identity')
    id: string;

    @Column()
    balance: number;

    @ManyToOne(type => Account, account => account.debitedTransactions)
    @JoinColumn()
    debitedAccount: Account;

    @ManyToOne(type => Account, account => account.creditedTransactions)
    @JoinColumn()
    creditedAccount: Account;

    @CreateDateColumn()
    createdAt: Date;
}