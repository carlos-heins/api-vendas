import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import isAuthenticated from '@shared/http/middlewares/isAuthenticated'
import ProfileController from '../controllers/ProfileController'

const profileRouter = Router()

const profileController = new ProfileController()

profileRouter.use(isAuthenticated)

profileRouter.get('/', profileController.show)
profileRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string().optional(), // se estiver preenchido o confirmation também deve estar;
      password_confirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', {
          is: Joi.exist(),
          // biome-ignore lint/suspicious/noThenProperty: <explanation>
          then: Joi.required(),
        }), // o campo precisa ser igual ao referenciado (password) se existr
    },
  }),
  profileController.update
)

export default profileRouter
