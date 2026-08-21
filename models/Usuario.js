import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Importe a conexão configurada anteriormente

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  nome_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  imagem: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  senha: {
    // Mesmo que no CSV as senhas sejam apenas números ("123456"), 
    // é altamente recomendado usar STRING para suportar hashes de criptografia (como bcrypt) futuramente.
    type: DataTypes.STRING, 
    allowNull: false,
  }
}, {
  // Configurações do Model
  tableName: 'usuario', // Nome da tabela no banco
  timestamps: true,      // Isso vai gerenciar automaticamente o 'createdAt' e 'updatedAt' que estão no seu CSV
});

export default Usuario;