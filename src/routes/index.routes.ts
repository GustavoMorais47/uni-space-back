import { Router } from "express";
import login from "../controllers/publico/login";
import auth from "../middlewares/auth";
import me from "../controllers/privado/me";
import Rooms from "../models/Room";

const routes = Router();

// Rotas publicas
routes.post("/login", login);

// Rotas privadas
routes.get("/me", auth);

// rotas by ZIUGOD
routes.post("/room", auth, (req, res) => {
    try {
        const {
            nome,
            bloco,
            corredor,
            capacidade,
            disponivel,
        } = req.body;

        if (!nome || !bloco || !corredor || !capacidade || !disponivel) {
            res.status(422).json({ error: "Dados inconsistentes." });
        };

        const room = {
            nome,
            bloco,
            corredor,
            capacidade,
            disponivel,
        };

        Rooms.create(room);

        return res.status(201).json({
            message: "Criado com suceso!",
        });

    } catch (error) {
        res.status(500).json({ error: error });
    }
});

export default routes;
