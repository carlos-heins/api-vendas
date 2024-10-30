import type { Request, Response } from 'express'
import ShowProfileService from '../services/ShowProfileService'
import UpdateProfileService from '../services/UpdateProfileService'

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const showProfileService = new ShowProfileService()

      const user_id = request.user.id
      const users = await showProfileService.execute({ user_id })

      return response.json(users)
    } catch (error) {
      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { name, email, password, old_password } = request.body
    try {
      const updateProfileService = new UpdateProfileService()

      const user = await updateProfileService.execute({
        user_id,
        name,
        email,
        password,
        old_password,
      })
      return response.status(201).json(user) // Status 201 Created
    } catch (error) {
      console.log(error)
      return response.status(400).json(error)
    }
  }
}
