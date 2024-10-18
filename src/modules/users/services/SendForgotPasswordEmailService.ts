import { UsersRepository } from '../typeorm/repositories/UsersRepository'
import AppError from '@shared/errors/AppError'
import path from 'node:path'
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository'
import EtherealMail from '@config/mail/EtherealMail'
import { link } from 'joi'

interface IRequest {
  email: string
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const user = await UsersRepository.findByEmail(email)
    if (!user) {
      throw new AppError('User does not exists.')
    }

    const { token } = await UserTokensRepository.generate(user.id)

    const forgotPasswordTemplatePath = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs'
    )

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API Vendas] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplatePath,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`,
        },
      },
      from: {
        name: 'Equipe API Vendas',
        email: 'equipe@apivendas.com.br',
      },
    })
  }
}

export default SendForgotPasswordEmailService
