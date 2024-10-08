import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import UsersController from '../controllers/UsersController'
import isAuthenticated from '@shared/http/middlewares/isAuthenticated'
import UserAvatarController from '../controllers/UserAvatarController'
import multer from 'multer'
import uploadConfig from '@config/upload'

const usersRouter = Router()
const upload = multer(uploadConfig)

const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

usersRouter.get('/', isAuthenticated, usersController.index)
usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create
)

usersRouter.patch(
  '/',
  isAuthenticated,
  upload.single('avatar'),
  userAvatarController.update
)

export default usersRouter
