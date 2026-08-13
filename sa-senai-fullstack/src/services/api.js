// src/services/api.js
import axios from "axios";

const api = axios.create({
  // Lembre-se de colocar a porta exata em que o seu backend está rodando (ex: 3000)
  baseURL: "http://localhost:3000/",
  timeout: 10000, // Cancela a requisição se demorar mais de 10 segundos
});

export default api;
