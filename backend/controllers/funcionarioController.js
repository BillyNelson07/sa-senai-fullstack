import FuncionarioServices from "../services/funcionarioServices.js";

const FuncionarioController = {
  /**
   * Lida com a requisição para criar um novo funcionário
   */
  async criarFuncionario(req, res) {
    try {
      const dadosDoBody = req.body;

      // Chama o service para salvar no banco
      const funcionarioSalvo = await FuncionarioServices.criar(dadosDoBody);

      // Retorna sucesso (201 Created) com os dados criados
      return res.status(201).json(funcionarioSalvo);
    } catch (erro) {
      // Retorna erro (400 Bad Request)
      return res.status(400).json({ erro: erro.message });
    }
  },
};

// Exporta o controller como uma variável
export default FuncionarioController;
