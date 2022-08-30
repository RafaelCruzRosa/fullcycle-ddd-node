import Product from "../entity/product"
import ProductService from "./product.service"

describe("Product service", () => {
  it("should be able to change price of all products", () => {
    const product1 = new Product("id1", "name 1", 100)
    const product2 = new Product("id2", "name 2", 200)

    ProductService.increasePrices([product1, product2], 100)

    expect(product1.price).toEqual(200)
    expect(product2.price).toEqual(400)
  })
})