import { RabbitMQConnection } from "../../../shared/amqp/rmqConnection";
import { AppError } from "../../../shared/errors/AppError";
import { Account } from "../../accounts/typeorm/entities/Account";
import { AccountRepository } from "../../accounts/typeorm/repositories/AccountRepository";
import { CustomerRepository } from "../../customers/typeorm/repository/CustomerRepository";

interface ISendTransactionMessage {
    debitedAccountId: number;
    creditedAccountUsername: string;
    value: number
}

export class SendTransactionMessageService {
    public async execute({ debitedAccountId, creditedAccountUsername, value }: ISendTransactionMessage) {
        value = value * 100;

        const debitedAccount = await AccountRepository.findById(debitedAccountId) as Account;
        const creditedCustomer = await CustomerRepository.findByUsername(creditedAccountUsername);

        if (!creditedCustomer) {
            throw new AppError("O usuário o qual você está tentando depositar não existe.")
        }

        if (debitedAccount.id == creditedCustomer.account.id) {
            throw new AppError("Não é possível enviar uma transação para si mesmo.")
        }

        if (debitedAccount?.balance < value) {
            throw new AppError("Seu saldo é insuficiente.")
        }

        if (value <= 0) {
            throw new AppError("O valor enviado precisa ser maio do que zero.")
        }

        await RabbitMQConnection.sendMessageTo('transactions', {
            debitedAccountId,
            creditedAccountId: creditedCustomer.account.id,
            value
        })

    }
}