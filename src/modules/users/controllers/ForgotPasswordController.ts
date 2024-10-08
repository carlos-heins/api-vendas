import type { Request, Response } from 'express'
import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService'

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { email } = request.body
      const sendForgotPasswordEmailService =
        new SendForgotPasswordEmailService()
      await sendForgotPasswordEmailService.execute({ email })
      return response.status(204).json() // Status 204 success - no content
    } catch (error) {
      return response.status(400).json(error)
    }
  }
}
