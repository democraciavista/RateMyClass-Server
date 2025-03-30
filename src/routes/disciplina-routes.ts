import { Router } from 'express';
import { disciplinaController } from '../http/controllers/disciplina-controller';

const disciplineRouter = Router();

disciplineRouter.post('/', disciplinaController.register);
disciplineRouter.get('/:id', disciplinaController.getById);
disciplineRouter.get('/', disciplinaController.getAllByFiltres);
disciplineRouter.put('/:id', disciplinaController.update);
disciplineRouter.delete('/:id', disciplinaController.delete);
disciplineRouter.get('/favorite/:id', disciplinaController.getAllFavoriteByFiltres);

export default disciplineRouter;