import type { Request, Response } from 'express'
import ResetPasswordService from '../services/ResetPasswordService'

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { token, password } = request.body
      const resetPasswordService = new ResetPasswordService()
      await resetPasswordService.execute({
        password,
        token,
      })
      return response.status(204).json()
    } catch (error) {
      return response.status(400).json(error)
    }
  }
}
