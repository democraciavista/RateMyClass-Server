import express from 'express';
import cors from 'cors';
import avaliacaoRoutes from './routes/avaliacao-routes';
import estatisticaRoutes from './routes/estatistica-routes';
import materialRoutes from './routes/material-routes';
import disciplinaRoutes from './routes/disciplina-routes'; 

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/avaliacoes', avaliacaoRoutes);
app.use('/api/estatisticas', estatisticaRoutes);
app.use('/api/materiais', materialRoutes);
app.use('/api', disciplinaRoutes);

export default app; 