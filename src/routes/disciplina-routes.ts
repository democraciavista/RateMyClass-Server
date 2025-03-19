import express from 'express';
import { disciplinaController } from '../http/controllers/disciplina-controller';

const router = express.Router();

// Rotas de Disciplina
router.post('/disciplinas', disciplinaController.create);
router.get('/disciplinas/:id', disciplinaController.getById);
router.get('/disciplinas', disciplinaController.getAll);
router.put('/disciplinas/:id', disciplinaController.update);
router.delete('/disciplinas/:id', disciplinaController.delete);

export default router;