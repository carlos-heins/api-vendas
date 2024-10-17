import { UsersRepository } from '../typeorm/repositories/UsersRepository'
import AppError from '@shared/errors/AppError'
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository'
import { isAfter, addHours } from 'date-fns'
import { hash } from 'bcryptjs'

interface IRequest {
  token: string
  password: string
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await UserTokensRepository.findByToken(token)
    if (!userToken) {
      throw new AppError('User token does not exists.')
    }

    const user = await UsersRepository.findById(userToken.user_id)
    if (!user) {
      throw new AppError('User does not exists.')
    }

    const tokenCreatedAt = userToken.created_at
    const compareDate = addHours(tokenCreatedAt, 2)

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.')
    }

    user.password = await hash(password, 8)

    await UsersRepository.save(user)
  }
}

export default ResetPasswordService
