import { Router } from "express";
import possuiPermissao from "../middlewares/possuiPermissao";
import { Role } from "../types";

const espacosRouter = Router();

espacosRouter.get(
  "/",
  (req, res, next) => possuiPermissao(req, res, next, [Role.ADMIN, Role.LABS]),
  (_, res) => res.sendStatus(200)
); // Retorna todos os espaços
espacosRouter.get(
  "/:id",
  (req, res, next) => possuiPermissao(req, res, next, [Role.ADMIN, Role.LABS]),
  (_, res) => res.sendStatus(200)
); // Retorna um espaço específico
espacosRouter.post(
  "/",
  (req, res, next) => possuiPermissao(req, res, next, [Role.ADMIN, Role.LABS]),
  (_, res) => res.sendStatus(200)
); // Cria um novo espaço
espacosRouter.put(
  "/:id",
  (req, res, next) => possuiPermissao(req, res, next, [Role.ADMIN, Role.LABS]),
  (_, res) => res.sendStatus(200)
); // Atualiza um espaço específico
espacosRouter.patch(
  "/status/:id",
  (req, res, next) => possuiPermissao(req, res, next, [Role.ADMIN, Role.LABS]),
  (_, res) => res.sendStatus(200)
); // Atualiza o status de um espaço específico

export default espacosRouter;
