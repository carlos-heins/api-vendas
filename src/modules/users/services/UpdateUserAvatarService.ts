import path from 'node:path'
import type User from '../typeorm/entities/User'
import { UsersRepository } from '../typeorm/repositories/UsersRepository'
import AppError from '@shared/errors/AppError'
import uploadConfig from '@config/upload'
import fs from 'node:fs'

interface IRequest {
  user_id: string
  avatarFilename: string
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await UsersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found.')
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath) //verifica o status do arquivo a partir do caminho
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFilename
    await UsersRepository.save(user)

    return user
  }
}

export default UpdateUserAvatarService
