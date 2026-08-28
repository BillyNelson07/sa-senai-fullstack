import AtividadeService from '../services/atividadeServices.js';

const AtividadeController = {
  
  async criar(req, res) {
    try {
      const dados = req.body;
      const novaAtividade = await AtividadeService.criar(dados);
      
      // Retorna status 201 (Created) e os dados da nova atividade
      return res.status(201).json(novaAtividade);
    } catch (erro) {
      // Retorna status 400 (Bad Request) em caso de erro de validação ou criação
      return res.status(400).json({ erro: erro.message });
    }
  },

  async buscarTodas(req, res) {
    try {
      const atividades = await AtividadeService.buscarTodas();
      
      // Retorna status 200 (OK) e a lista de atividades
      return res.status(200).json(atividades);
    } catch (erro) {
      // Retorna status 500 (Internal Server Error) se houver falha no servidor
      return res.status(500).json({ erro: erro.message });
    }
  }

};

export default AtividadeController;