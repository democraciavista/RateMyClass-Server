import { disciplineController } from '@http/controllers/discipline-controller';
import { Router } from 'express';

const disciplineRouter = Router();

disciplineRouter.post('/', disciplineController.register);
disciplineRouter.get('/:id', disciplineController.getById);
disciplineRouter.get('/', disciplineController.getAllByFiltres);
disciplineRouter.put('/:id', disciplineController.update);
disciplineRouter.delete('/:id', disciplineController.delete);
disciplineRouter.get('/favorite/:id', disciplineController.getAllFavoriteByFiltres);

export default disciplineRouter;