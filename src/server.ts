import "dotenv/config";
import express from "express";
import routes from "./routes/index.routes";
import mongoose from "mongoose";
import utils from "./utils";

const PORT = Number(process.env.PORT?.replace(/[^0-9]/g, "")) || 3000;
const ambiente = process.env.AMBIENTE || "dev";
const banco = ambiente === "prod" ? "uniSpace" : "uniSpace-Test";


const app = express();
const serverURI = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.icphymd.mongodb.net/${banco}?retryWrites=true&w=majority`;

app.use(express.json());
app.use("/", routes);

async function main() {
  await utils
    .getEnv()
    .then(async (env) => {
      await mongoose
        .connect(serverURI)
        .then(() => {
          app.listen(PORT, () =>
            console.log(
              `Servidor rodando na porta: ${PORT}.\nSistema: ${banco}`
            )
          );
        })
        .catch((error) => {
          console.error(error);
          process.exit(1);
        });
    })
    .catch(() => {
      console.error("Erro ao carregar variáveis de ambiente.");
      process.exit(1);
    });
}

main();
