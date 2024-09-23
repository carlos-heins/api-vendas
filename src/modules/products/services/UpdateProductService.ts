import Products from "../typeorm/entities/Products";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

class UpdateProductService {
    public async execute({ id, name, price, quantity }: IRequest): Promise<Products> {
        const product = await ProductRepository.findOne({ where: { id } });
        if (!product) {
            throw new AppError("Product not found");
        }

        const productNameAlreadyExists = await ProductRepository.findByName(name);

        if(productNameAlreadyExists && productNameAlreadyExists.id != id) {
            throw new AppError("There is alreayd one product with this name");
        }

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await ProductRepository.save(product);

        return product;
    }
}

export default UpdateProductService;