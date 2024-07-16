import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";

class ListProductService {
    public async execute(): Promise<Product[] | null> {

        const products = ProductRepository.find();

        return products;
    }
}

export default ListProductService;