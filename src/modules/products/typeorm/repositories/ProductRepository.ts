import { AppDataSource } from '@shared/typeorm/data-source';
import Products from '../entities/Products';

export const ProductRepository = AppDataSource.getRepository(Products).extend({
  async findByName(name: string): Promise<Products | null> {
    return await this.findOne({
      where: {
        name,
      },
    });
  },
});