import express from "express";
import FuncionarioController from "../controllers/funcionarioController.js";

const router = express.Router();

router.post("/post", FuncionarioController.criarFuncionario);

// Exporta o router para ser usado no index.js
export default router;
