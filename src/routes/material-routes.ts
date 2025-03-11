import express from 'express';
import { criarMaterial, buscarMateriaisPorDisciplina } from '../http/controllers/material-controller';

const router = express.Router();

router.post('/materiais', criarMaterial);
router.get('/disciplinas/:disciplinaId/materiais', buscarMateriaisPorDisciplina);

export default router;