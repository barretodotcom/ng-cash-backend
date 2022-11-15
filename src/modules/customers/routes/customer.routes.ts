import { Router } from "express";
import { CustomerController } from "../controllers/CustomerController";
import { CustomerRepository } from "../typeorm/repository/CustomerRepository";

const customerRoutes = Router()

customerRoutes.post("/create", CustomerController.create);
customerRoutes.post("/session", CustomerController.session);
customerRoutes.delete("/delete/:customerId", CustomerController.session);
customerRoutes.get("/list", CustomerController.findall)
export default customerRoutes