import { Router } from "express";
import login from "../controllers/publico/login";
import auth from "../middlewares/auth";
import me from "../controllers/privado/me";

const routes = Router();

// Rotas publicas
routes.post("/login", login);

// Rotas privadas
routes.get("/me", auth, me);

export default routes;
