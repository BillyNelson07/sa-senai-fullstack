import express from "express";
import UsuarioController from "../controllers/usuarioController.js";
const router = express.Router();

router.post("/post", UsuarioController.criarUsuario);

export default router;
