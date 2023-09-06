import { Request, Response } from "express";

export default function me(req: Request, res: Response) {
  try {
    const servicos = [
      {
        id: "support",
        titulo: "Suporte",
        navegador: "Support",
        imagem: "",
        cor_fundo: "#ADDDFF",
        cor_fonte: "#000F99",
        status: true,
      },
      {
        id: "virtual_room",
        navegador: "VirtualRoom",
        titulo: "Sala Virtual",
        imagem: "",
        cor_fundo: "#D1ADFF",
        cor_fonte: "#8300C0",
        status: false,
      },
      {
        id: "schedules",
        navegador: "Schedules",
        titulo: "Agendamentos",
        imagem: "",
        cor_fundo: "#ADFFBF",
        cor_fonte: "#115700",
        status: false,
      },
      {
        id: "calendar",
        navegador: "Calendar",
        titulo: "Calendário",
        imagem: "",
        cor_fundo: "#FFADAD",
        cor_fonte: "#980000",
        status: false,
      },
    ];
    return res.status(200).json({
      user: req.body.payload,
      servicos,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}
