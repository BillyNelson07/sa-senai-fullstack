import bcrypt from "bcrypt";
import Usuario from "../models/Usuario.js";

const UsuarioServices = {
  /**
   * Cria um novo usuário criptografando a senha antes de salvar.
   * @param {Object} dados - Objeto contendo nome, nome_usuario e senha original.
   * @returns {Object} O usuário recém-criado (sem a senha).
   */
  async criar(dados) {
    try {
      // 1. Verifica se a senha foi enviada
      if (!dados.nome || !dados.nome_usuario) {
        throw new Error("Nome e nome de usuário são obrigatórios.");
      }
      if (!dados.senha) {
        throw new Error("A senha é obrigatória.");
      }

      // 2. Define o "custo" do processamento do hash (10 é o padrão recomendado)
      const saltRounds = 10;

      // 3. Gera o hash da senha
      const senhaHasheada = await bcrypt.hash(dados.senha, saltRounds);

      // 4. Substitui a senha original em texto puro pelo hash gerado
      const dadosParaSalvar = {
        ...dados,
        senha: senhaHasheada,
      };

      // 5. Salva no banco de dados
      const novoUsuario = await Usuario.create(dadosParaSalvar);

      // 6. Remove a senha do objeto de retorno por segurança (não devolver no JSON da API)
      const usuarioRetorno = novoUsuario.toJSON();
      delete usuarioRetorno.senha;

      return usuarioRetorno;
    } catch (erro) {
      // Verifica se o erro é de nome_usuario duplicado (Unique Constraint do Sequelize)
      if (erro.name === "SequelizeUniqueConstraintError") {
        throw new Error("Esse nome de usuário já está em uso.");
      }

      console.error("❌ Erro no UsuarioService.criar:", erro);
      throw new Error(erro.message || "Erro ao criar usuário.");
    }
  },
};

export default UsuarioServices;
