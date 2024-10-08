import { hash } from 'bcryptjs'
import type User from '../typeorm/entities/User'
import { UsersRepository } from '../typeorm/repositories/UsersRepository'
import AppError from '@shared/errors/AppError'

interface IRequest {
  name: string
  email: string
  password: string
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const emailAlreadyExists = await UsersRepository.findByEmail(email)
    if (emailAlreadyExists) {
      throw new AppError('Email address already used.')
    }

    const hashedPassword = await hash(password, 8)

    const user = UsersRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    await UsersRepository.save(user)

    return user
  }
}

export default CreateUserService
