import { AppDataSource } from '@shared/typeorm/data-source'
import UserToken from '../entities/UserToken'

export const UserTokensRepository = AppDataSource.getRepository(
  UserToken
).extend({
  async findByToken(token: string): Promise<UserToken | null> {
    return await this.findOne({
      where: {
        token,
      },
      // order: {
      //   created_at: 'DESC',
      // },
    })
  },
  async generate(user_id: string): Promise<UserToken | null> {
    const userToken = this.create({
      user_id,
    })

    await this.save(userToken)

    return userToken
  },
})
