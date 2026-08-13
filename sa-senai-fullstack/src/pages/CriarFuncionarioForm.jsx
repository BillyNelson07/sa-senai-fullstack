import { useState } from "react";
import api from "../services/api.js";

function CriarFuncionarioForm() {
  const [formData, setFormData] = useState({
    nome: "",
    data_admissao: "",
    extra: "",
    remuneracao_base: "",
    remuneracao: "",
    data_ultimo_aumento: "",
    quantia_aumento: "",
    unidade: "",
  });

  const [mensagem, setMensagem] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Faz o POST para a rota de funcionários configurada no axios
      const response = await api.post("/funcionarios", formData);
      setMensagem(
        `✅ Funcionário ${response.data.nome} cadastrado com sucesso!`
      );

      // Limpa os campos do formulário após o sucesso
      setFormData({
        nome: "",
        data_admissao: "",
        extra: "",
        remuneracao_base: "",
        remuneracao: "",
        data_ultimo_aumento: "",
        quantia_aumento: "",
        unidade: "",
      });
    } catch (error) {
      // Captura a mensagem de erro que vem do backend
      const erroApi =
        error.response?.data?.erro || "Erro ao conectar com o servidor.";
      setMensagem(`❌ ${erroApi}`);
    }
  };

  const inputStyle = {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "450px",
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      <h2>Cadastrar Novo Funcionário</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <span>Nome Completo *</span>
          <input
            type="text"
            name="nome"
            placeholder="Ex: João da Silva"
            value={formData.nome}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <span>Data de Admissão *</span>
          <input
            type="date"
            name="data_admissao"
            value={formData.data_admissao}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <span>Unidade *</span>
          <input
            type="text"
            name="unidade"
            placeholder="Ex: Matriz SP"
            value={formData.unidade}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <span>Remuneração Base (R$) *</span>
          <input
            type="number"
            step="0.01"
            name="remuneracao_base"
            placeholder="0.00"
            value={formData.remuneracao_base}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <span>Remuneração Total (R$) *</span>
          <input
            type="number"
            step="0.01"
            name="remuneracao"
            placeholder="0.00"
            value={formData.remuneracao}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <span>Extra (R$)</span>
          <input
            type="number"
            step="0.01"
            name="extra"
            placeholder="0.00"
            value={formData.extra}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <span>Data do Último Aumento</span>
          <input
            type="date"
            name="data_ultimo_aumento"
            value={formData.data_ultimo_aumento}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <span>Quantia do Aumento (R$)</span>
          <input
            type="number"
            step="0.01"
            name="quantia_aumento"
            placeholder="0.00"
            value={formData.quantia_aumento}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#28A745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
            marginTop: "10px",
          }}
        >
          Salvar Funcionário
        </button>
      </form>

      {mensagem && (
        <p style={{ marginTop: "20px", fontWeight: "bold" }}>{mensagem}</p>
      )}
    </div>
  );
}

export default CriarFuncionarioForm;
