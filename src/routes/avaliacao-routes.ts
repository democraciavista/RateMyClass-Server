import express from 'express';
import { criarAvaliacao, buscarAvaliacoesPorDisciplina } from '../http/controllers/avaliacao-controller';

const router = express.Router();

router.post('/avaliacoes', criarAvaliacao);
router.get('/disciplinas/:disciplinaId/avaliacoes', buscarAvaliacoesPorDisciplina);

export default router;