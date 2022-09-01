import Product from "../../domain/entity/product";
import RepositoryInterface from "../../domain/repository/repository-interface";
import ProductModel from "../db/sequelize/model/product.model";

export default class ProductRepository implements RepositoryInterface<Product> {
  async update(entity: Product): Promise<void> {
    await ProductModel.update({
      name: entity.name,
      price: entity.price
    }, {
      where: { id: entity.id }
    })
  }

  async find(id: string): Promise<Product> {
    try {
      const productModel = await ProductModel.findOne({ where: { id } })
      if (!productModel) {
        throw new Error("Product not found")
      }
      return new Product(productModel.id, productModel.name, productModel.price)
    } catch (error) {
      throw error
    }
  }

  async findAll(): Promise<Product[]> {
    const productsModels = await ProductModel.findAll()
    return productsModels.map(product => {
      return new Product(product.id, product.name, product.price)
    })
  }

  async create(entity: Product) {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price
    })
  }
}