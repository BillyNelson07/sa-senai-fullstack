import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Configurando a instância do Sequelize com a URL única do Render
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Necessário para aceitar o certificado SSL do Render
    },
  },
});

export default sequelize;