import { AppDataSource } from "@shared/typeorm/data-source";
import User from "../entities/User";

export const UsersRepository = AppDataSource.getRepository(User).extend({
    async findByName(name: string): Promise<User | null> {
        return await this.findOne({
            where: {
                name,
            }
        });
    },
    async findById(id: string): Promise<User | null> {
        return await this.findOne({
            where: {
                id,
            },
        });
    },
    async findByEmail(email: string): Promise<User | null> {
        return await this.findOne({
            where: {
                email,
            },
        });
    },
});