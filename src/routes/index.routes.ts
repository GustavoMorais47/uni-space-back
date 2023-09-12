import { Router } from "express";
import login from "../controllers/publico/login";
import auth from "../middlewares/auth";
import me from "../controllers/privado/me";
import Room from "../models/Room";
import { error } from "console";

const routes = Router();

// Rotas publicas
routes.post("/login", login);

// Rotas privadas
routes.get("/me", auth);


// create
routes.post("/room", auth, async (req, res) => {
    try {
        const {
            nome,
            bloco,
            corredor,
            capacidade,
            disponivel,
        } = req.body;

        if (!nome || !bloco || !corredor || !capacidade || disponivel === undefined) {
            return res.status(422).json({ error: "Dados inconsistentes." });
        }

        const room = await Room.create({
            nome,
            bloco,
            corredor,
            capacidade,
            disponivel,
        });

        return res.status(201).json({
            message: "Criado com sucesso!",
            room,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
});


// read
routes.get("/room", auth, async (req, res) => {
    try {
        const rooms = await Room.find();

        if (!rooms || rooms.length === 0) {
            return res.status(404).json({ error: "Nenhuma sala encontrada." });
        }

        return res.status(200).json(rooms);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
});


// read with an ID
routes.get("/room/:id", auth, async (req, res) => {
    try {
        const roomId = req.params.id;

        const room = await Room.findById(roomId);

        if (!room) {
            return res.status(404).json({ error: "Sala não encontrada." });
        }

        return res.status(200).json(room);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
});


// update
routes.put("/room/:id", auth, async (req, res) => {
    try {
        const roomId = req.params.id;
        const updates = req.body;

        const room = await Room.findByIdAndUpdate(roomId, updates, { new: true });

        if (!room) {
            return res.status(404).json({ error: "Sala não encontrada." });
        }

        return res.status(200).json(room);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
});

// delete
routes.delete("/room/:id", auth, async (req, res) => {
    try {
        const roomId = req.params.id;

        const room = await Room.findByIdAndRemove(roomId);

        if (!room) {
            return res.status(404).json({ error: "Sala não encontrada." });
        }

        return res.status(204).end(); // Retorna 204 No Content para indicar sucesso sem resposta.

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
});



export default routes;
