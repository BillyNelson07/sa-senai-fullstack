import express from "express";
import AtividadeController from "../controllers/atividadeController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/post", AtividadeController.criar);
router.get("/get", AtividadeController.buscarTodas);
router.get("/get/minhas/:id", authMiddleware.autenticarToken,AtividadeController.buscarTodasDeUmUsuario);

export default router;
