import AppError from '@shared/errors/AppError'
import type User from '../typeorm/entities/User'
import { UsersRepository } from '../typeorm/repositories/UsersRepository'
import { compare, hash } from 'bcryptjs'

interface IRequest {
  user_id: string
  name: string
  email: string
  password?: string
  old_password?: string
}

class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await UsersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found')
    }

    const userUpdateEmail = await UsersRepository.findByEmail(email)

    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new AppError('There is already a user with this email')
    }

    if (password && !old_password) {
      throw new AppError(
        'Please provide your old password to update your password'
      )
    }

    if (password && old_password) {
      const passwordMatched = await compare(old_password, user.password)
      if (!passwordMatched) {
        throw new AppError('Old password does not match')
      }

      user.password = await hash(password, 8)
    }

    user.name = name
    user.email = email

    await UsersRepository.save(user)

    return user
  }
}

export default UpdateProfileService
