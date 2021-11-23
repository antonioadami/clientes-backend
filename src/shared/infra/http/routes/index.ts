import { Router } from 'express';

import clientsRouter from '@modules/clients/infra/http/routes/clients.routes';
import addressRouter from '@modules/address/infra/http/routes/address.routes';

const routes = Router();
routes.use('/clients', clientsRouter);
routes.use('/address', addressRouter);

export default routes;
