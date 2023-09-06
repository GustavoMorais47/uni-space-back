import { Schema, model } from "mongoose";
import { UserType } from "../types";

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
  senha: {
    type: String,
    required: true,
  },
});

const Users = model<UserType>("Users", schema);

Users.find().then(async (users) => {
  if (users.length === 0) {
    await Users.create({
      nome: "admin",
      role: "admin",
      cpf: "00000000000",
      email: "gustavomorais47.gm@gmail.com",
      senha: "$2a$10$qCTS6WASs6ZWQr0lS9EiiOBXB.t2bkO8H2KkHP.EZ7MCy4s4yOEVO",
    })
      .then(() => console.log("Usuário admin criado"))
      .catch((error) => console.error("Erro ao criar usuário admin", error));
  }
});

export default Users;
