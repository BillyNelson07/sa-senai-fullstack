import express from 'express';
import AtividadeController from '../controllers/atividadeController.js';

const router = express.Router();

router.post('/atividades', AtividadeController.criar);
router.get('/atividades', AtividadeController.buscarTodas);

export default router;