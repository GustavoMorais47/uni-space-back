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
    const { cpf, senha, role } = req.body;

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
      return res.status(401).json({
        mensagem: "Usuário ou senha incorretos",
      });

    const match = bcrypt.compareSync(senha, user.senha);

    if (!match) {
      const novaTentativa = tentativas ? Number(tentativas) + 1 : 1;

      cache.set(String(cpf), String(novaTentativa), 1800);

      return res.status(401).json({
        mensagem: "Usuário ou senha incorretos",
      });
    }

    cache.del(String(cpf));

    if (!user.status)
      return res.status(403).json({
        mensagem: "Usuário bloqueado",
      });

    if (user.role.length > 1 && !role)
      return res.status(200).json({
        mensagem: "Usuário possui mais de uma permissão",
        nome: user.nome,
        permissoes: user.role,
      });

    if (!user.role.includes(role) && user.role.length > 1)
      return res.status(400).json({
        mensagem: "Usuário não possui essa permissão",
        permissoes: user.role,
      });

    const payload: PayloadType = {
      id: user._id,
      role: user.role.length > 1 ? role : user.role[0],
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "30d",
    });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
