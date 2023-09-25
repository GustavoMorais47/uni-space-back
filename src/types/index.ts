import { Document } from "mongoose";

export interface CorType {
  vermelho: number;
  verde: number;
  azul: number;
  transparencia: number;
}

export enum Role {
  ADMIN = "admin",
  LABS = "labs",
  INFRA = "infra",
  PROFESSOR = "professor",
  ALUNO = "aluno",
}

export enum ServicosEnum {
  SUPPORT = "Support",
  MANAGE_SPACES = "Manage_Spaces",
}

export interface UserType extends Document {
  nome: string;
  role: Role[];
  cpf: string;
  email: string;
  status: boolean;
  senha: string;
}

export interface PayloadType {
  id: string;
  role: Role;
}

export interface ServicosType {
  id: ServicosEnum;
  titulo: string;
  imagem: string;
  cor_fundo: CorType;
  cor_fonte: CorType;
  necessita_conexao: boolean;
  status: boolean;
}
