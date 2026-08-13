import UsuarioService from "../services/usuarioServices.js";

const UsuarioController = {
  /**
   * Lida com a requisição para criar um novo usuário
   */
  async criarUsuario(req, res) {
    try {
      const dadosDoBody = req.body;

      // Chama o service para salvar no banco
      const usuarioSalvo = await UsuarioService.criar(dadosDoBody);

      // Retorna sucesso (201 Created) com os dados criados
      return res.status(201).json(usuarioSalvo);
    } catch (erro) {
      // Retorna erro (400 Bad Request)
      return res.status(400).json({ erro: erro.message });
    }
  },
};

// Exporta o controller como uma variável
export default UsuarioController;
