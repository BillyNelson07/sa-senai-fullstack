import express from 'express';
import usuarioController from '../controllers/usuarioController.js';

const router = express.Router();

// Rota para criar um novo usuário
router.post('/registrar', usuarioController.criar);

// Rota para fazer login e receber o token JWT
router.post('/login', usuarioController.login);

export default router;