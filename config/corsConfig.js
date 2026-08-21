const corsConfig = {
  origin: "http://localhost:5173", // Permite apenas o seu frontend Vite
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
  credentials: true, // Necessário se o seu frontend for enviar cookies ou tokens
};

export default corsConfig;
