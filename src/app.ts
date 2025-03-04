import express, { type Express } from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerDocument from '@docs';
import routes from '@routes';

import errorHandler from '@http/middlewares/error-handler';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

export default app;
