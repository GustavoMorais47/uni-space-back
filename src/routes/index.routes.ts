import { Router } from "express";
import login from "../controllers/publico/login";

const routes = Router();

routes.post("/login", login);

export default routes;