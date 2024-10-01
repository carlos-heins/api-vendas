import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SessionsControler from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsControler = new SessionsControler();

sessionsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    }),
    sessionsControler.create
);

export default sessionsRouter;