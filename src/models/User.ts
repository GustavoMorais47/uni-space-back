import { Schema, model } from "mongoose";
import { Role, UserType } from "../types";

const schema = new Schema<UserType>({
  nome: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "labs", "infra", "professor", "aluno"],
  },
  cpf: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  senha: {
    type: String,
    required: true,
  },
});

const Users = model<UserType>("Users", schema);

Users.find().then(async (users) => {
  if (users.length === 0) {
    const users = [
      {
        nome: "Labs",
        role: Role.LABS,
        cpf: "91307235077",
        email: "labs@example.com",
        senha: "$2a$10$2nMphKe44s./DYvdczQ/gu12sxhm304e3/tkzDEFXTp5BJyeoRTK6",
      },
      {
        nome: "Infra",
        role: Role.INFRA,
        cpf: "34959215089",
        email: "infra@example.com",
        senha: "$2a$10$2nMphKe44s./DYvdczQ/gu12sxhm304e3/tkzDEFXTp5BJyeoRTK6",
      },
      {
        nome: "Professor",
        role: Role.PROFESSOR,
        cpf: "22332577076",
        email: "professor@example.com",
        senha: "$2a$10$2nMphKe44s./DYvdczQ/gu12sxhm304e3/tkzDEFXTp5BJyeoRTK6",
      },
      {
        nome: "Aluno",
        role: Role.ALUNO,
        cpf: "74706207029",
        email: "aluno@example.com",
        senha: "$2a$10$2nMphKe44s./DYvdczQ/gu12sxhm304e3/tkzDEFXTp5BJyeoRTK6",
      },
    ];

    await Users.create({
      nome: "admin",
      role: Role.ADMIN,
      cpf: "00000000000",
      email: "gustavomorais47.gm@gmail.com",
      senha: "$2a$10$qCTS6WASs6ZWQr0lS9EiiOBXB.t2bkO8H2KkHP.EZ7MCy4s4yOEVO",
    })
      .then(() => console.log("Usuário admin criado"))
      .catch((error) => console.error("Erro ao criar usuário admin", error));
    await Users.insertMany(users)
      .then(() => console.log("Usuários criados"))
      .catch((error) => console.error("Erro ao criar usuários", error));
  }
});

export default Users;
