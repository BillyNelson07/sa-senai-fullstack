import express from "express";
import UsuarioController from "../controllers/usuarioController.js";
import authMiddleware from "../middlewares/authMIddleware.js";
const router = express.Router();

router.post(
  "/",
  authMiddleware.autenticarToken,
  UsuarioController.criarUsuario
);

export default router;
