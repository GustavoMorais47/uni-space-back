import { Document } from "mongoose";

export enum Role {
  ADMIN = "admin",
  LABS = "labs",
  INFRA = "infra",
  PROFESSOR = "professor",
  ALUNO = "aluno",
}

export interface UserType extends Document {
  nome: string;
  role: Role[];
  cpf: string;
  email: string;
  status: boolean;
  senha: string;
}

export interface HorarioType {
  disponivel: boolean;
  inicio: number | null;
  fim: number | null;
}

export interface DisponibilidadeType {
  padrao: boolean;
  domingo: HorarioType | null;
  segunda: HorarioType | null;
  terca: HorarioType | null;
  quarta: HorarioType | null;
  quinta: HorarioType | null;
  sexta: HorarioType | null;
  sabado: HorarioType | null;
}

export interface EspacosType extends Document {
  id: string;
  nome: string;
  localizacao: string;
  imagens: string[];
  capacidade: number;
  disponibilidade: DisponibilidadeType;
  status: boolean;
}

export interface PayloadType {
  id: string;
  role: Role;
}
