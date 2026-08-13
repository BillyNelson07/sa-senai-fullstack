import Funcionario from "../models/Funcionario.js";

const FuncionarioServices = {
  /**
   * Salva um novo funcionário no banco de dados.
   * @param {Object} dados - Objeto contendo os dados do funcionário.
   * @returns {Object} O funcionário recém-criado.
   */
  async criar(dados) {
    try {
      if (
        !dados.nome ||
        !dados.data_admissao ||
        !dados.remuneracao_base ||
        !dados.remuneracao ||
        !dados.unidade
      ) {
        throw new Error("Dados necessários incompletos!");
      }

      // O método .create() do Sequelize faz o INSERT no banco de dados
      const novoFuncionario = await Funcionario.create(dados);

      return novoFuncionario;
    } catch (erro) {
      // Captura e repassa o erro para ser tratado pelo Controller
      console.error("❌ Erro no FuncionarioService.criar:", erro);
      throw new Error(`Não foi possível salvar o funcionário: ${erro.message}`);
    }
  },
};

// Exportando o serviço como um objeto constante
export default FuncionarioServices;
{
}
