import AppError from "@shared/errors/AppError";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";

interface IRequet {
    id: string;
}

class ShowProductService {


    public async execute({ id }: IRequet): Promise<Product | null> {

        const product = await ProductRepository.findOne({ where: { id } });
        if (!product) {
            throw new AppError("Product not found");
        }
        return product;
    }
}

export default ShowProductService;