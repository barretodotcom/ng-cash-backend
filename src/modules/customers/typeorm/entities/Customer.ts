import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, CreateDateColumn, JoinColumn } from "typeorm";
import { Account } from "../../../accounts/typeorm/entities/Account";

@Entity('customer')
export class Customer {

    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column()
    username: string;

    @Exclude()
    @Column()
    password: string;

    @OneToOne(type => (Account), account => account.customer, { eager: true })
    @JoinColumn()
    account: Account;

    @CreateDateColumn()
    createdAt: Date;
}