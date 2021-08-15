import { Router } from 'express';
import ClientsController from '../controllers/ClientsController';

const clientsRouter = Router();

const clientsController = new ClientsController();

clientsRouter.post('/', clientsController.create);
clientsRouter.get('/', clientsController.findAll);
clientsRouter.put('/:cpf', clientsController.update);
clientsRouter.delete('/:cpf', clientsController.delete);

export default clientsRouter;
