import express from "express";
import AtividadeController from "../controllers/atividadeController.js";

const router = express.Router();

router.post("/post", AtividadeController.criar);
router.get("/get", AtividadeController.buscarTodas);

export default router;
