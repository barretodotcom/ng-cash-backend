import { Request, Response } from "express";
import { CreateCustomer } from "../services/CreateCustomerService";
import { CustomerSession } from "../services/CustomerSessionService";
import { DeleteCustomer } from "../services/DeleteCustomerService";
import { CustomerRepository } from "../typeorm/repository/CustomerRepository";

export class CustomerController {


    static async findall(request: Request, response: Response): Promise<Response> {

        return response.status(201).json(await CustomerRepository.findall());
    }


    static async create(request: Request, response: Response): Promise<Response> {
        const { username, password } = request.body;

        const customer = await CreateCustomer.execute({ username, password });

        return response.status(201).json(customer);
    }

    static async session(request: Request, response: Response): Promise<Response> {
        const { username, password } = request.body;

        const customerAndToken = await CustomerSession.execute({ username, password });

        return response.status(201).json(customerAndToken);
    }

    static async delete(request: Request, response: Response): Promise<Response> {
        const { customerId } = request.params;

        await DeleteCustomer.execute(parseInt(customerId));

        return response.status(204);
    }
}