import Products from "../typeorm/entities/Products";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";

class ListProductService {
    public async execute(): Promise<Products[] | null> {

        const products = ProductRepository.find();

        return products;
    }
}

export default ListProductService;