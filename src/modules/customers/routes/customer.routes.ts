import { Router } from "express";
import { CustomerController } from "../controllers/CustomerController";

const customerRoutes = Router()

customerRoutes.post("/create", CustomerController.create);
customerRoutes.post("/session", CustomerController.session);
customerRoutes.delete("/delete/:customerId", CustomerController.session);
export default customerRoutes