import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import authConfig from '@config/auth'
import type User from '../typeorm/entities/User'
import { UsersRepository } from '../typeorm/repositories/UsersRepository'
import AppError from '@shared/errors/AppError'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await UsersRepository.findByEmail(email)
    if (!user) {
      throw new AppError('Incorrect email or password.', 401)
    }

    const passwordConfirmed = await compare(password, user.password)

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email or password.', 401)
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    })

    return {
      user,
      token,
    }
  }
}

export default CreateSessionsService
