import { UsersRepository } from '../typeorm/repositories/UsersRepository'
import AppError from '@shared/errors/AppError'
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository'
import dayjs from 'dayjs'
import { hash } from 'bcryptjs'

interface IRequest {
  token: string
  password: string
}

class ResetPasswordService {
  public async execute({ token , password}: IRequest): Promise<void> {
    const userToken = await UserTokensRepository.findByToken(token)
    if (!userToken) {
      throw new AppError('User token does not exists.')
    }

    const user = await UsersRepository.findById(userToken.user_id)
    if (!user) {
      throw new AppError('User does not exists.')
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = dayjs(tokenCreatedAt).add(2, "hour");

    if(compareDate.isAfter(dayjs())) {
      throw new AppError("Token expired.")
    }

    user.password = await hash(password, 8);
  }
}

export default ResetPasswordService