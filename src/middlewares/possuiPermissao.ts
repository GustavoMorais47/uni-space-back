import { NextFunction, Request, Response } from "express";
import { PayloadBodyType, Role } from "../types";

export default function possuiPermissao(
  req: Request,
  res: Response,
  next: NextFunction,
  permissoes: Array<Role>
) {
  try {
    const { payload }: { payload: PayloadBodyType } = req.body;

    if (!payload) {
      return res.status(401).json({ mensagem: "Token não encontrado" });
    }

    if (!permissoes.includes(payload.role)) {
      return res
        .status(403)
        .json({
          mensagem: "Usuário não tem permissão para acessar este recurso",
        });
    }

    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}
