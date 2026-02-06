import { ProductsAttribute } from "../models/products.model";
import Products from "../models/products.model";
import { Model, WhereOptions } from 'sequelize';
import { IProducts } from "../interfaces/products.interface";
export class ProductsService {

  public async getProductById(id: number) {
    return Products.findByPk(id);
  }

  public createProduct(ProductData: ProductsAttribute) {
    return Products.create(ProductData);
  }

   public async getAllByMerchant(id: number) {
    return Products.findAll({
      where: { merchantID : id} as WhereOptions<ProductsAttribute>
    })
  }

  public async updateProductById(id: number, data: IProducts) {
    return Products.update(data,{ where: { id } });
  }

  public async deleteProduct(id: number) {
    return await Products.destroy({where: { id } });
  }

}