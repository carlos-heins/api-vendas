import Products from "../typeorm/entities/Products";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
    name: string;
    price: number;
    quantity: number;
}

class CreateProductService {
    public async execute({name, price, quantity}:IRequest): Promise<Products> {
        const productAlreadyExists = await ProductRepository.findByName(name);
        if(productAlreadyExists) {
            throw new AppError("There is already one product with this name");
        }

        const product = ProductRepository.create({
            name, 
            price,
            quantity,
        });

        await ProductRepository.save(product);

        return product;
    }
}

export default CreateProductService;