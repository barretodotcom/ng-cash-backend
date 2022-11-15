import { Request, Response } from "express";
import { ListTransactionsServices } from "../services/ListTransactionsService";
import { SendTransactionMessageService } from "../services/SendTransactionMessage";

export class TransactionsController {
    static async listAccountTransactions(request: Request, response: Response): Promise<Response> {
        const listTransactionsService = new ListTransactionsServices();

        const accountId = request.customer.customerId;

        const accountTransactions = await listTransactionsService.execute(parseInt(accountId));

        return response.json(accountTransactions)
    }

    static async sendTransactionMessage(request: Request, response: Response): Promise<Response> {
        const sendTransactionMessageService = new SendTransactionMessageService();

        const debitedAccountId = request.customer.accountId;

        const { creditedAccountUsername, value } = request.body;

        await sendTransactionMessageService.execute({ debitedAccountId, creditedAccountUsername, value });

        return response.json({ message: "Transação enviada com sucesso, chegará em segundos." }).status(201)
    }
}