import { Schema, model } from "mongoose";
import { EspacosType } from "../types";
import { DisponibilidadeSchema } from ".";

const schema = new Schema<EspacosType>({
  nome: {
    type: String,
    required: true,
  },
  localizacao: {
    type: String,
    required: true,
  },
  capacidade: {
    type: Number,
    required: true,
    min: 0,
  },
  imagens: {
    type: [String],
    required: true,
    default: [],
  },
  disponibilidade: {
    type: DisponibilidadeSchema,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const Espacos = model<EspacosType>("Espacos", schema);

export default Espacos;
