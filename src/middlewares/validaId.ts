import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

export default function validaId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ mensagem: "ID não informado" });
    }

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ mensagem: "ID inválido" });
    }

    return next();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}
