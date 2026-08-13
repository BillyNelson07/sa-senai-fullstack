import { DataTypes } from "sequelize";
// Importe a instância do banco de dados configurada anteriormente
import sequelize from "../config/database.js";

const Funcionario = sequelize.define(
  "Funcionario",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Gera o UUIDv4 automaticamente
      primaryKey: true,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data_admissao: {
      // DATEONLY guarda apenas a data (YYYY-MM-DD).
      // Se precisar de data e hora exata, mude para DataTypes.DATE
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    extra: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0, // Valor padrão zero caso não seja informado
    },
    remuneracao_base: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    remuneracao: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    data_ultimo_aumento: {
      type: DataTypes.DATEONLY,
      allowNull: true, // Pode ser nulo, pois recém-contratados não têm último aumento
    },
    quantia_aumento: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    unidade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "funcionario",
    timestamps: true, // Cria automaticamente 'createdAt' e 'updatedAt'
  },
);

// Exportando o modelo como uma variável constante
export default Funcionario;
