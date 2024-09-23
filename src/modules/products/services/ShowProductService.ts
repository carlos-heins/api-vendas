import AppError from "@shared/errors/AppError";
import Products from "../typeorm/entities/Products";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";

interface IRequet {
    id: string;
}

class ShowProductService {
    public async execute({ id }: IRequet): Promise<Products | null> {

        const product = await ProductRepository.findOne({ where: { id } });
        if (!product) {
            throw new AppError("Product not found");
        }
        return product;
    }
}

export default ShowProductService;