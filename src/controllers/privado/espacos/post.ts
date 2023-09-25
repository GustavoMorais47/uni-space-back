import { Request, Response } from "express";
import config from "../../../config.json";
import { EspacosType } from "../../../types";
import Espacos from "../../../models/Espacos";

export async function criarEspaco(req: Request, res: Response) {
  try {
    const { nome, localizacao, capacidade, imagens, disponibilidade } =
      req.body;

    if (!nome || !localizacao || !capacidade || !imagens || !disponibilidade) {
      return res.status(400).json({
        mensagem:
          "Os campos nome, localização, capacidade, imagens e disponibilidade são obrigatórios",
      });
    }

    if (nome.length > 50 || nome.length < 3) {
      return res.status(400).json({
        mensagem: "O nome deve conter entre 3 e 50 caracteres",
      });
    }

    if (localizacao.length > 200 || localizacao.length < 3) {
      return res.status(400).json({
        mensagem: "A localização deve conter entre 3 e 200 caracteres",
      });
    }

    if (capacidade < 0) {
      return res.status(400).json({
        mensagem: "A capacidade deve ser maior ou igual a 0",
      });
    }

    if (
      !Array.isArray(imagens) ||
      imagens.length > config.gerenciamento_espacos.qtd_imagens ||
      imagens.some((imagem) => typeof imagem !== "string")
    ) {
      return res.status(400).json({
        mensagem: `O campo imagens deve ser um array de strings com no máximo ${config.gerenciamento_espacos.qtd_imagens} elementos`,
      });
    }

    if (
      !disponibilidade.padrao ||
      !disponibilidade.domingo ||
      !disponibilidade.segunda ||
      !disponibilidade.terca ||
      !disponibilidade.quarta ||
      !disponibilidade.quinta ||
      !disponibilidade.sexta ||
      !disponibilidade.sabado
    ) {
      return res.status(400).json({
        mensagem:
          "O campo disponibilidade deve conter os campos padrao, domingo, segunda, terca, quarta, quinta, sexta e sabado",
      });
    }

    if (typeof disponibilidade.padrao !== "boolean") {
      return res.status(400).json({
        mensagem: "O campo disponibilidade.padrao deve ser um booleano",
      });
    }

    if (
      !disponibilidade.domingo.disponivel ||
      !disponibilidade.domingo.inicio ||
      !disponibilidade.domingo.fim
    ) {
      return res.status(400).json({
        mensagem:
          "O campo disponibilidade.domingo deve conter os campos disponivel, inicio e fim",
      });
    }

    if (typeof disponibilidade.domingo.disponivel !== "boolean") {
      return res.status(400).json({
        mensagem:
          "O campo disponibilidade.domingo.disponivel deve ser um booleano",
      });
    }

    if (
      typeof disponibilidade.domingo.inicio !== "number" ||
      typeof disponibilidade.domingo.fim !== "number" ||
      disponibilidade.domingo.inicio < 0 ||
      disponibilidade.domingo.fim < 0 ||
      disponibilidade.domingo.inicio > 1440 ||
      disponibilidade.domingo.fim > 1440 ||
      disponibilidade.domingo.inicio > disponibilidade.domingo.fim
    ) {
      return res.status(400).json({
        mensagem:
          "O campo disponibilidade.domingo.inicio e disponibilidade.domingo.fim devem ser números inteiros entre 0 e 1440 e disponibilidade.domingo.inicio deve ser menor que disponibilidade.domingo.fim",
      });
    }

    if (
      !disponibilidade.segunda.disponivel ||
      !disponibilidade.segunda.inicio ||
      !disponibilidade.segunda.fim
    ) {
      return res.status(400).json({
        mensagem:
          "O campo disponibilidade.segunda deve conter os campos disponivel, inicio e fim",
      });
    }

    if (typeof disponibilidade.segunda.disponivel !== "boolean") {
      return res.status(400).json({
        mensagem:
          "O campo disponibilidade.segunda.disponivel deve ser um booleano",
      });
    }

    if (
      typeof disponibilidade.segunda.inicio !== "number" ||
      typeof disponibilidade.segunda.fim !== "number" ||
      disponibilidade.segunda.inicio < 0 ||
      disponibilidade.segunda.fim < 0 ||
      disponibilidade.segunda.inicio > 1440 ||
      disponibilidade.segunda.fim > 1440 ||
      disponibilidade.segunda.inicio > disponibilidade.segunda.fim
    ) {
      return res.status(400).json({
        mensagem:
          "O campo disponibilidade.segunda.inicio e disponibilidade.segunda.fim devem ser números inteiros entre 0 e 1440 e disponibilidade.segunda.inicio deve ser menor que disponibilidade.segunda.fim",
      });
    }

    if (
      !disponibilidade.terca.disponivel ||
      !disponibilidade.terca.inicio ||
      !disponibilidade.terca.fim
    ) {
      return res.status(400).json({
        mensagem:
          "O campo disponibilidade.terca deve conter os campos disponivel, inicio e fim",
      });
    }

    if (typeof disponibilidade.terca.disponivel !== "boolean") {
      return res.status(400).json({
        mensagem:
          "O campo disponibilidade.terca.disponivel deve ser um booleano",
      });
    }

    if (
      typeof disponibilidade.terca.inicio !== "number" ||
      typeof disponibilidade.terca.fim !== "number" ||
      disponibilidade.terca.inicio < 0 ||
      disponibilidade.terca.fim < 0 ||
      disponibilidade.terca.inicio > 1440 ||
      disponibilidade.terca.fim > 1440 ||
      disponibilidade.terca.inicio > disponibilidade.terca.fim
    ) {
      return res.status(400).json({
        mensagem:
          "O campo disponibilidade.terca.inicio e disponibilidade.terca.fim devem ser números inteiros entre 0 e 1440 e disponibilidade.terca.inicio deve ser menor que disponibilidade.terca.fim",
      });
    }

    if (
      !disponibilidade.quarta.disponivel ||
      !disponibilidade.quarta.inicio ||
      !disponibilidade.quarta.fim
    ) {
      return res.status(400).json({
        mensagem:
          "O campo disponibilidade.quarta deve conter os campos disponivel, inicio e fim",
      });
    }

    if (typeof disponibilidade.quarta.disponivel !== "boolean") {
      return res.status(400).json({
        mensagem:
          "O campo disponibilidade.quarta.disponivel deve ser um booleano",
      });
    }

    if (
      typeof disponibilidade.quarta.inicio !== "number" ||
      typeof disponibilidade.quarta.fim !== "number" ||
      disponibilidade.quarta.inicio < 0 ||
      disponibilidade.quarta.fim < 0 ||
      disponibilidade.quarta.inicio > 1440 ||
      disponibilidade.quarta.fim > 1440 ||
      disponibilidade.quarta.inicio > disponibilidade.quarta.fim
    ) {
      return res.status(400).json({
        mensagem:
          "O campo disponibilidade.quarta.inicio e disponibilidade.quarta.fim devem ser números inteiros entre 0 e 1440 e disponibilidade.quarta.inicio deve ser menor que disponibilidade.quarta.fim",
      });
    }

    if (
      !disponibilidade.quinta.disponivel ||
      !disponibilidade.quinta.inicio ||
      !disponibilidade.quinta.fim
    ) {
      return res.status(400).json({
        mensagem:
          "O campo disponibilidade.quinta deve conter os campos disponivel, inicio e fim",
      });
    }

    if (typeof disponibilidade.quinta.disponivel !== "boolean") {
      return res.status(400).json({
        mensagem:
          "O campo disponibilidade.quinta.disponivel deve ser um booleano",
      });
    }

    if (
      typeof disponibilidade.quinta.inicio !== "number" ||
      typeof disponibilidade.quinta.fim !== "number" ||
      disponibilidade.quinta.inicio < 0 ||
      disponibilidade.quinta.fim < 0 ||
      disponibilidade.quinta.inicio > 1440 ||
      disponibilidade.quinta.fim > 1440 ||
      disponibilidade.quinta.inicio > disponibilidade.quinta.fim
    ) {
      return res.status(400).json({
        mensagem:
          "O campo disponibilidade.quinta.inicio e disponibilidade.quinta.fim devem ser números inteiros entre 0 e 1440 e disponibilidade.quinta.inicio deve ser menor que disponibilidade.quinta.fim",
      });
    }

    if (
      !disponibilidade.sexta.disponivel ||
      !disponibilidade.sexta.inicio ||
      !disponibilidade.sexta.fim
    ) {
      return res.status(400).json({
        mensagem:
          "O campo disponibilidade.sexta deve conter os campos disponivel, inicio e fim",
      });
    }

    if (typeof disponibilidade.sexta.disponivel !== "boolean") {
      return res.status(400).json({
        mensagem:
          "O campo disponibilidade.sexta.disponivel deve ser um booleano",
      });
    }

    if (
      typeof disponibilidade.sexta.inicio !== "number" ||
      typeof disponibilidade.sexta.fim !== "number" ||
      disponibilidade.sexta.inicio < 0 ||
      disponibilidade.sexta.fim < 0 ||
      disponibilidade.sexta.inicio > 1440 ||
      disponibilidade.sexta.fim > 1440 ||
      disponibilidade.sexta.inicio > disponibilidade.sexta.fim
    ) {
      return res.status(400).json({
        mensagem:
          "O campo disponibilidade.sexta.inicio e disponibilidade.sexta.fim devem ser números inteiros entre 0 e 1440 e disponibilidade.sexta.inicio deve ser menor que disponibilidade.sexta.fim",
      });
    }

    if (
      !disponibilidade.sabado.disponivel ||
      !disponibilidade.sabado.inicio ||
      !disponibilidade.sabado.fim
    ) {
      return res.status(400).json({
        mensagem:
          "O campo disponibilidade.sabado deve conter os campos disponivel, inicio e fim",
      });
    }

    if (typeof disponibilidade.sabado.disponivel !== "boolean") {
      return res.status(400).json({
        mensagem:
          "O campo disponibilidade.sabado.disponivel deve ser um booleano",
      });
    }

    if (
      typeof disponibilidade.sabado.inicio !== "number" ||
      typeof disponibilidade.sabado.fim !== "number" ||
      disponibilidade.sabado.inicio < 0 ||
      disponibilidade.sabado.fim < 0 ||
      disponibilidade.sabado.inicio > 1440 ||
      disponibilidade.sabado.fim > 1440 ||
      disponibilidade.sabado.inicio > disponibilidade.sabado.fim
    ) {
      return res.status(400).json({
        mensagem:
          "O campo disponibilidade.sabado.inicio e disponibilidade.sabado.fim devem ser números inteiros entre 0 e 1440 e disponibilidade.sabado.inicio deve ser menor que disponibilidade.sabado.fim",
      });
    }

    const espaco = {
      nome,
      imagens,
      localizacao,
      capacidade,
      disponibilidade: {
        padrao: disponibilidade.padrao,
        domingo: disponibilidade.padrao
          ? null
          : {
              disponivel: disponibilidade.domingo.disponivel,
              inicio: disponibilidade.domingo.disponivel
                ? disponibilidade.domingo.inicio
                : null,
              fim: disponibilidade.domingo.disponivel
                ? disponibilidade.domingo.fim
                : null,
            },
        segunda: disponibilidade.padrao
          ? null
          : {
              disponivel: disponibilidade.segunda.disponivel,
              inicio: disponibilidade.segunda.disponivel
                ? disponibilidade.segunda.inicio
                : null,
              fim: disponibilidade.segunda.disponivel
                ? disponibilidade.segunda.fim
                : null,
            },
        terca: disponibilidade.padrao
          ? null
          : {
              disponivel: disponibilidade.terca.disponivel,
              inicio: disponibilidade.terca.disponivel
                ? disponibilidade.terca.inicio
                : null,
              fim: disponibilidade.terca.disponivel
                ? disponibilidade.terca.fim
                : null,
            },
        quarta: disponibilidade.padrao
          ? null
          : {
              disponivel: disponibilidade.quarta.disponivel,
              inicio: disponibilidade.quarta.disponivel
                ? disponibilidade.quarta.inicio
                : null,
              fim: disponibilidade.quarta.disponivel
                ? disponibilidade.quarta.fim
                : null,
            },
        quinta: disponibilidade.padrao
          ? null
          : {
              disponivel: disponibilidade.quinta.disponivel,
              inicio: disponibilidade.quinta.disponivel
                ? disponibilidade.quinta.inicio
                : null,
              fim: disponibilidade.quinta.disponivel
                ? disponibilidade.quinta.fim
                : null,
            },
        sexta: disponibilidade.padrao
          ? null
          : {
              disponivel: disponibilidade.sexta.disponivel,
              inicio: disponibilidade.sexta.disponivel
                ? disponibilidade.sexta.inicio
                : null,
              fim: disponibilidade.sexta.disponivel
                ? disponibilidade.sexta.fim
                : null,
            },
        sabado: disponibilidade.padrao
          ? null
          : {
              disponivel: disponibilidade.sabado.disponivel,
              inicio: disponibilidade.sabado.disponivel
                ? disponibilidade.sabado.inicio
                : null,
              fim: disponibilidade.sabado.disponivel
                ? disponibilidade.sabado.fim
                : null,
            },
      },
      status: true,
    };

    await Espacos.create(espaco)
      .then((esp) => {
        return res.status(201).json({
          mensagem: "Espaço cadastrado com sucesso",
          espaco: {
            _id: esp._id,
            nome: esp.nome,
            imagens: esp.imagens,
            localizacao: esp.localizacao,
            capacidade: esp.capacidade,
            disponibilidade: esp.disponibilidade,
          },
        });
      })
      .catch((error) => {
        return res
          .status(500)
          .json({ mensagem: "Ocorreu um erro durante o cadastro do espaço" });
      });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}
