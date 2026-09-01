import axios from "axios";

/**
 * Instância única do axios, usada por toda a aplicação.
 *
 * A URL base vem de uma variável de ambiente (definida no arquivo .env,
 * veja .env.example na raiz do projeto), então basta trocar o valor lá
 * para apontar para o seu back-end (local, homologação, produção etc.).
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * POST /login — usado pela página de Login (src/pages/Login/Login.jsx).
 * @param {string} email
 * @param {string} senha
 * @returns {Promise<{ token: string, usuario: object }>}
 */
export async function login(email, senha) {
  const { data } = await api.post("/usuarios/login", { email, senha });
  if (data.token) {
    localStorage.setItem("saepsaude:token", data.token);
  }
  return data;
}

export default api;