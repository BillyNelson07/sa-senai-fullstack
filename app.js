import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Importa a configuração do banco de dados e a função de teste
import sequelize from "./config/database.js";

// Importa os modelos para garantir que o Sequelize os conheça na hora da sincronização
import Usuario from "./models/Usuario.js";
import Atividade from "./models/Atividade.js";
import corsConfig from "./config/corsConfig.js";

dotenv.config();

const app = express();

// --- CONFIGURAÇÕES INICIAIS (MIDDLEWARES) ---

// Permite que o servidor receba requisições em formato JSON (essencial para APIs)
app.use(express.json());

// Habilita o CORS para permitir que aplicações frontend (React, Vue, etc) acessem a API
app.use(cors(corsConfig));

// Rota de verificação (Health Check)
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Servidor Express está rodando perfeitamente!",
  });
});

// --- INICIALIZAÇÃO DO SERVIDOR E BANCO DE DADOS ---

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
  try {
    await sequelize.sync({ alter: true });
    console.log("🔄 Modelos sincronizados com o banco de dados.");

    // 3. Inicia o servidor Express
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  } catch (erro) {
    console.error("❌ Falha ao iniciar o servidor:", erro);
  }
}

iniciarServidor();
