import { Request, Response } from 'express';
import ListUserService from '../services/ListUserService';
import CreateUserService from '../services/CreateUserService';

export default class UsersController {
    public async index(request: Request, response: Response): Promise<Response> {
        try {
            const listUserService = new ListUserService();
            const users = await listUserService.execute();
            return response.json(users);
        } catch (error) {
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;

        try {
            const createUserService = new CreateUserService();
            const user = await createUserService.execute({ name, email, password });
            return response.status(201).json(user); // Status 201 Created
        } catch (error) {
            console.log(error);
            return response.status(400).json(error);
        }
    }
}