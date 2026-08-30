import bcrypt from "bcrypt";
import sequelize from "sequelize";
import Usuario from "../models/Usuario.js";

const UsuarioServices = {
  /**
   * Cadastra um novo usuário no banco de dados.
   * @param {Object} dadosUsuario - Objeto contendo nome, email, nome_usuario, senha e imagem (opcional).
   * @returns {Object} O usuário criado (sem a senha).
   */
  async criar(dadosUsuario) {
    const { nome, email, nome_usuario, senha, imagem } = dadosUsuario;

    // 1. Verificar se o e-mail ou nome de usuário já estão cadastrados
    const usuarioExistente = await Usuario.findOne({
      where: {
        [sequelize.Op.or]: [{ email }, { nome_usuario }],
      },
    });

    if (usuarioExistente) {
      throw new Error("E-mail ou nome de usuário já estão em uso.");
    }

    // 2. Criptografar a senha (boa prática recomendada no seu model)
    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    // 3. Criar o usuário no banco de dados
    const novoUsuario = await Usuario.create({
      nome,
      email,
      nome_usuario,
      imagem: imagem || null,
      senha: senhaHash,
    });

    // 4. Remover a senha do objeto de retorno por segurança
    const usuarioRetorno = novoUsuario.toJSON();
    delete usuarioRetorno.senha;

    return usuarioRetorno;
  },
  /**
   * Faz login no sistema.
   * @param {Object} { nome_usuario, senha } - Objeto contendo nome, nome_usuario e senha original.
   * @returns {Object} O token JWT para acessar as funções do sistema.
   */
  async login({ nome_usuario, senha }) {
    if (!nome_usuario || !senha) {
      throw new Error("Dados incompletos!");
    }

    const usuarioValido = await Usuario.findOne({ where: { nome_usuario } });

    if (!usuarioValido) {
      throw new Error("Dados incorretos!");
    }

    const comparacaoDeSenhas = await bcrypt.compare(
      senha,
      usuarioValido.senha_hash,
    );

    if (!comparacaoDeSenhas) {
      throw new Error("Dados incorretos!");
    }

    const payloadPraGerarTokenJWT = {
      id: usuarioValido.id,
      nome_usuario: usuarioValido.nome_usuario,
    };
    const segredoJWT = process.env.JWT_SECRET;
    const opcoesJWT = { expiresIn: process.env.JWT_EXPIRES_IN };

    const tokenJWT = jwt.sign(payloadPraGerarTokenJWT, segredoJWT, opcoesJWT);

    return tokenJWT;
  },
};

export default UsuarioServices;
