import Atividade from '../models/Atividade.js';

const AtividadeService = {
  
  async criar(dados) {
    try {
      const novaAtividade = await Atividade.create(dados);
      return novaAtividade;
    } catch (erro) {
      throw new Error('Erro ao criar a atividade: ' + erro.message);
    }
  },

  async buscarTodas() {
    try {
      const atividades = await Atividade.findAll();
      return atividades;
    } catch (erro) {
      throw new Error('Erro ao buscar as atividades: ' + erro.message);
    }
  }

};

export default AtividadeService;