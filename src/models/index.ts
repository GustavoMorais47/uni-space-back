import { Schema } from "mongoose";
import { DisponibilidadeType, HorarioType } from "../types";

const HorarioSchema = new Schema<HorarioType>({
  disponivel: {
    type: Boolean,
    required: true,
    default: false,
  },
  inicio: {
    type: Number,
    required: false,
    default: null,
  },
  fim: {
    type: Number,
    required: false,
    default: null,
  },
});

export const DisponibilidadeSchema = new Schema<DisponibilidadeType>({
  padrao: {
    type: Boolean,
    required: true,
    default: true,
  },
  domingo: {
    type: HorarioSchema,
    required: false,
    default: null,
  },
  segunda: {
    type: HorarioSchema,
    required: false,
    default: null,
  },
  terca: {
    type: HorarioSchema,
    required: false,
    default: null,
  },
  quarta: {
    type: HorarioSchema,
    required: false,
    default: null,
  },
  quinta: {
    type: HorarioSchema,
    required: false,
    default: null,
  },
  sexta: {
    type: HorarioSchema,
    required: false,
    default: null,
  },
});
