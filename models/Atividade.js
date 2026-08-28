import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Atividade = sequelize.define('Atividade', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tipo_atividade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  distancia_percorrida: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  duracao_atividade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantidade_calorias: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuario', // Nome da tabela de usuários no banco
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'atividade',
  timestamps: true, // Gerencia 'createdAt' e 'updatedAt' automaticamente
});

export default Atividade;