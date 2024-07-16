import { AppDataSource } from '@shared/typeorm/data-source';
import Product from '../entities/Product';

export const ProductRepository = AppDataSource.getRepository(Product).extend({
  async findByName(name: string): Promise<Product | null> {
    return await this.findOne({
      where: {
        name,
      },
    });
  },
});