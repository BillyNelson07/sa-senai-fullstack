import { DataTypes } from 'sequelize';
// Substitua pelo caminho real do seu arquivo de conexão com o banco
import sequelize from '../config/database.js'; 

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true // Validação extra do formato de email
    }
  },
  nome_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  imagem: {
    type: DataTypes.STRING,
    allowNull: true // Pode ser nulo caso o usuário não envie foto no cadastro
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'usuarios',
  timestamps: true
});

// Exportando o modelo como uma variável
export default Usuario;