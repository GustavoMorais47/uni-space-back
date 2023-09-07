import "dotenv/config";
import { Request, Response } from "express";
import { cpf as cpfValidator } from "cpf-cnpj-validator";
import Users from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import NodeCache from "node-cache";
import { PayloadType } from "../../types";

const cache = new NodeCache();

export default async function login(req: Request, res: Response) {
  try {
    const { cpf, senha } = req.body;

    if (!cpf || !senha)
      return res.status(400).json({
        mensagem: "CPF e senha são obrigatórios",
      });

    if (!cpfValidator.isValid(cpf) && cpf !== "00000000000")
      return res.status(400).json({
        mensagem: "CPF inválido",
      });

    const tentativas = cache.get(String(cpf));

    if (tentativas && Number(tentativas) >= 3)
      return res.status(403).json({
        mensagem:
          "Você excedeu o limite de tentativas, tente novamente mais tarde",
      });

    const user = await Users.findOne({ cpf });

    if (!user)
      return res.status(404).json({
        mensagem: "Usuário não encontrado",
      });

    const match = bcrypt.compareSync(senha, user.senha);

    if (!match) {
      const novaTentativa = tentativas ? Number(tentativas) + 1 : 1;

      cache.set(String(cpf), String(novaTentativa), 1800);

      return res.status(401).json({
        mensagem: "Senha incorreta",
      });
    }

    cache.del(String(cpf));

    const payload: PayloadType = {
      id: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
