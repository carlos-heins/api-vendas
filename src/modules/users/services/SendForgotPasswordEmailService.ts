import { UsersRepository } from '../typeorm/repositories/UsersRepository'
import AppError from '@shared/errors/AppError'
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository'
import EtherealMail from '@config/mail/EtherealMail'

interface IRequest {
  email: string
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const user = await UsersRepository.findByEmail(email)
    if (!user) {
      throw new AppError('User does not exists.')
    }

    const token = await UserTokensRepository.generate(user.id)

    await EtherealMail.sendMail({
      to: email,
      body: `Solicitação de redefinição de senha recebida: ${token?.token}`,
    })
  }
}

export default SendForgotPasswordEmailService
