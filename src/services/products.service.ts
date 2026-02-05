import { ProductsAttribute } from "../models/products.model";
import Products from "../models/products.model";

export class ProductsService {

  public async getProductById(id: number) {
    return Products.findByPk(id);
  }

  public createProduct(ProductData: ProductsAttribute) {
    return Products.create(ProductData);
  }

}