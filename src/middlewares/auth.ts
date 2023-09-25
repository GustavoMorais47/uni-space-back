import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { PayloadType } from "../types";
import Usuarios from "../models/Usuarios";

export default function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization)
      return res.status(401).json({ mensagem: "Acesso negado" });

    const bearer = authorization.split(" ")[0];
    const token = authorization.split(" ")[1];

    if (bearer !== "Bearer" || !token)
      return res.status(401).json({
        mensagem: "Acesso negado",
      });

    jwt.verify(token, process.env.JWT_SECRET!, async (err, decoded) => {
      if (err) return res.status(401).json({ mensagem: "Acesso negado" });

      req.body.payload = decoded;
      const { payload }: { payload: PayloadType } = req.body;

      if (!Types.ObjectId.isValid(payload.id))
        return res.status(400).json({ mensagem: "ID inválido" });

      const user = await Usuarios.findById(payload.id).select("-senha -__v");

      if (!user)
        return res.status(404).json({ mensagem: "Usuário não existe" });

      if (!user.status)
        return res.status(401).json({ mensagem: "Usuário desativado" });

      req.body.payload = {
        _id: user._id,
        nome: user.nome,
        role: payload.role,
      };

      next();
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}
