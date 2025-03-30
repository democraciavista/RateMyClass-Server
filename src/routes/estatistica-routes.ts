import express from 'express';
import { criarEstatistica, buscarEstatisticasPorDisciplina } from '../http/controllers/estatistica-controller';

const router = express.Router();

router.post('/estatisticas', criarEstatistica);
router.get('/disciplinas/:disciplinaId/estatisticas', buscarEstatisticasPorDisciplina);

export default router;