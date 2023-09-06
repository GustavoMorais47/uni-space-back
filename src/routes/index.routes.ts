import { Router } from "express";
import login from "../controllers/publico/login";
import auth from "../middlewares/auth";
import me from "../controllers/privado/me";

const routes = Router();

// Rotas publicas
routes.post("/login", login);
routes.get("/ping", (_, res) => res.sendStatus(200));

// Rotas privadas
routes.get("/me", auth, me);
routes.get("/ping-auth", auth,(_, res) => res.sendStatus(200));

export default routes;
