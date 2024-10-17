import type { Request, Response } from 'express'
import CreateSessionsService from '../services/CreateSessionsService'

export default class SessionsControler {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body

      const createSessionService = new CreateSessionsService()

      const user = await createSessionService.execute({
        email,
        password,
      })
      return response.json(user)
    } catch (error) {
      return response.status(400).json(error)
    }
  }
}
