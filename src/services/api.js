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

export default api;
