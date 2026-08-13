// src/App.jsx
import { useState } from "react";
import api from "./services/api";

function App() {
  const [formData, setFormData] = useState({
    nome: "",
    nome_usuario: "",
    senha: "",
  });

  const [mensagem, setMensagem] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que a página recarregue

    try {
      // Faz o POST para a rota de usuários configurada no axios
      const response = await api.post("/usuarios", formData);
      setMensagem(`✅ Usuário ${response.data.nome} criado com sucesso!`);

      // Limpa os campos do formulário após o sucesso
      setFormData({ nome: "", nome_usuario: "", senha: "" });
    } catch (error) {
      // Captura a mensagem de erro que vem do backend
      const erroApi =
        error.response?.data?.erro || "Erro ao conectar com o servidor.";
      setMensagem(`❌ ${erroApi}`);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "400px",
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      <h2>Cadastrar Novo Usuário</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <input
          type="text"
          name="nome"
          placeholder="Nome Completo"
          value={formData.nome}
          onChange={handleChange}
          required
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="text"
          name="nome_usuario"
          placeholder="Nome de Usuário"
          value={formData.nome_usuario}
          onChange={handleChange}
          required
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={formData.senha}
          onChange={handleChange}
          required
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Salvar Usuário
        </button>
      </form>

      {/* Renderiza a mensagem de sucesso ou erro apenas se ela existir */}
      {mensagem && (
        <p style={{ marginTop: "20px", fontWeight: "bold" }}>{mensagem}</p>
      )}
    </div>
  );
}

export default App;
