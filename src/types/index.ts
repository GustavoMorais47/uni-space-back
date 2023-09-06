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
  role: Role;
  cpf: string;
  email: string;
  status: boolean;
  senha: string;
}

export interface RoomType extends Document {
  nome: string;
  bloco: string;
  corredor: string;
  capacidade: Number;
  disponivel: boolean;
}

export interface PayloadType {
  id: string;
  role: Role;
}
