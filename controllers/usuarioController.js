import UsuarioServices from "../services/usuarioServices.js";

const usuarioController = {
  async criar(req, res) {
    try {
      const dados = req.body;
      const novoUsuario = await UsuarioServices.criar(dados);

      // Retorna status 201 (Created) e os dados do usuário sem a senha
      return res.status(201).json(novoUsuario);
    } catch (erro) {
      // Retorna status 400 (Bad Request) em caso de erro (ex: usuário já existe ou falta de dados)
      return res.status(400).json({ erro: erro.message });
    }
  },

  async login(req, res) {
    try {
      const { nome_usuario, senha } = req.body;
      const token = await UsuarioServices.login({ nome_usuario, senha });

      // Retorna status 200 (OK) e o token gerado
      return res.status(200).json({ token: token });
    } catch (erro) {
      // Define o status HTTP com base na mensagem de erro
      let statusCode = 400; // Bad Request (para dados incompletos)

      if (erro.message === "Dados incorretos!") {
        statusCode = 401; // Unauthorized (para credenciais inválidas)
      }

      return res.status(statusCode).json({ erro: erro.message });
    }
  },
};

export default usuarioController;
