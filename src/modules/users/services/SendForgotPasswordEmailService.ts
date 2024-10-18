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

    const { token } = await UserTokensRepository.generate(user.id)

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API Vendas] Recuperação de senha',
      templateData: {
        // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
        template: `Olá {{name}}: {{token}}`,
        variables: {
          name: user.name,
          token: token,
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
