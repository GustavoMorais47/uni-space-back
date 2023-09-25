import { Router } from "express";
import possuiPermissao from "../middlewares/possuiPermissao";
import { Role } from "../types";
import { recuperarEspacoPeloId, recuperarEspacos } from "../controllers/privado/espacos/get";
import validaId from "../middlewares/validaId";
import { criarEspaco } from "../controllers/privado/espacos/post";

const espacosRouter = Router();

espacosRouter.get(
  "/",
  (req, res, next) => possuiPermissao(req, res, next, [Role.ADMIN, Role.LABS]),
  recuperarEspacos
); // Retorna todos os espaços
espacosRouter.get(
  "/:id",
  validaId,
  (req, res, next) => possuiPermissao(req, res, next, [Role.ADMIN, Role.LABS]),
  recuperarEspacoPeloId
); // Retorna um espaço específico
espacosRouter.post(
  "/",
  (req, res, next) => possuiPermissao(req, res, next, [Role.ADMIN, Role.LABS]),
  criarEspaco
); // Cria um novo espaço
espacosRouter.put(
  "/:id",
  validaId,
  (req, res, next) => possuiPermissao(req, res, next, [Role.ADMIN, Role.LABS]),
  (_, res) => res.sendStatus(200)
); // Atualiza um espaço específico
espacosRouter.patch(
  "/status/:id",
  validaId,
  (req, res, next) => possuiPermissao(req, res, next, [Role.ADMIN, Role.LABS]),
  (_, res) => res.sendStatus(200)
); // Atualiza o status de um espaço específico

export default espacosRouter;
