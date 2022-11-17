import { Request, Response } from "express";
import { CreateCustomer } from "../services/CreateCustomerService";
import { CustomerSession } from "../services/CustomerSessionService";
import { DeleteCustomer } from "../services/DeleteCustomerService";
import { CustomerRepository } from "../typeorm/repository/CustomerRepository";

export class CustomerController {

    static async create(request: Request, response: Response): Promise<Response> {
        const createCustomerService = new CreateCustomer();

        const { username, password } = request.body;

        const customer = await createCustomerService.execute({ username, password });

        return response.status(201).json(customer);
    }

    static async session(request: Request, response: Response): Promise<Response> {
        const customerSessionService = new CustomerSession();

        const { username, password } = request.body;

        const customerAndToken = await customerSessionService.execute({ username, password });

        return response.status(201).json(customerAndToken);
    }

    static async delete(request: Request, response: Response): Promise<Response> {
        const deleteCustomerService = new DeleteCustomer();

        const { customerId } = request.params;

        await deleteCustomerService.execute(parseInt(customerId));

        return response.status(204);
    }
}