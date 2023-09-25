import { Request, Response } from "express";
import Espacos from "../../../models/Espacos";

export async function recuperarEspacos(req: Request, res: Response) {
  try {
    const espacos = await Espacos.find();

    return res.status(200).json(espacos);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}

export async function recuperarEspacoPeloId(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const espaco = await Espacos.findById(id);

    if (!espaco) {
      return res.status(404).json({ mensagem: "Espaço não encontrado" });
    }

    return res.status(200).json(espaco);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}
