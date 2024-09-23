import AppError from "@shared/errors/AppError";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";

interface IRequet {
    id: string;
}

class DeleteProductService {


    public async execute({ id }: IRequet): Promise<void> {

        const product = await ProductRepository.findOne({ where: { id } });
        if (!product) {
            throw new AppError("Product not found");
        }

        await ProductRepository.remove(product);
    }
}

export default DeleteProductService;