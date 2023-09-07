import { Request, Response } from "express";
import { Role, ServicosEnum, ServicosType, UserType } from "../../types";

const suporte: ServicosType = {
  id: ServicosEnum.SUPPORT,
  titulo: "Suporte",
  imagem: "",
  cor_fundo: {
    vermelho: 173,
    verde: 221,
    azul: 255,
    transparencia: 100,
  },
  cor_fonte: {
    vermelho: 0,
    verde: 15,
    azul: 153,
    transparencia: 60,
  },
  necessita_conexao: true,
  status: true,
};

const gerenciar_espacos: ServicosType = {
  id: ServicosEnum.MANAGE_SPACES,
  titulo: "Gerenciar Espaços",
  imagem: "",
  cor_fundo: {
    vermelho: 255,
    verde: 251,
    azul: 161,
    transparencia: 100,
  },
  cor_fonte: {
    vermelho: 194,
    verde: 175,
    azul: 0,
    transparencia: 76,
  },
  necessita_conexao: true,
  status: true,
};

export default async function me(req: Request, res: Response) {
  try {
    const { payload }: { payload: UserType } = req.body;

    let servicos: ServicosType[] = [];
    if (payload.role === Role.LABS) servicos = [suporte, gerenciar_espacos];

    return res.status(200).json({
      user: req.body.payload,
      servicos,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}
