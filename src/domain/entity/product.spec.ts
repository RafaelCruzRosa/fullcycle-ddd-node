import Product from "./product"

describe("Product domain test", () => {
  it("Should throw error if id is empty", () => {
    expect(() => {
      const product = new Product("", "product name", 10)
    }).toThrowError("Product id is required")
  })

  it("Should throw error if price is equals 0", () => {
    expect(() => {
      const product = new Product("123", "product name", 0)
    }).toThrowError("Product price must be greater than zero")
  })

  it("Should throw error if name is empty", () => {
    expect(() => {
      const product = new Product("123", "", 10)
    }).toThrowError("Product name is required")
  })

  it("Should be able to change product name", () => {
    const product = new Product("123", "name", 10)
    product.changeName("new name")
    expect(product.name).toEqual("new name")
  })

  it("Should be able to change product price", () => {
    const product = new Product("123", "name", 10)
    product.changePrice(30)
    expect(product.price).toEqual(30)
  })
})