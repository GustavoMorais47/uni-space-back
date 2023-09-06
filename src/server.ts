import "dotenv/config";
import express from "express";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

function main() {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

main();
