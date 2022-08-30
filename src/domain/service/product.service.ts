import Product from "../entity/product";

export default class ProductService {
  static increasePrices(products: Product[], percentage: number): void {
    products.map(product => product.changePrice((product.price * percentage) / 100 + product.price))
  }
}