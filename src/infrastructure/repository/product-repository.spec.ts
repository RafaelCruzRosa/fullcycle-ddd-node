import { Sequelize } from "sequelize-typescript"
import Product from "../../domain/entity/product"
import ProductModel from "../db/sequelize/model/product.model"
import ProductRepository from "./product-repository"

describe("Product repository test", () => {
  let sequelize: Sequelize
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should create a product", async () => {
    const product = new Product("1", "product name", 10)

    const productRepository = new ProductRepository()

    await productRepository.create(product)

    const productCreated = await ProductModel.findOne({ where: { id: "1" } })

    if (!productCreated) {
      expect(false).toBeTruthy()
      return;
    }

    expect(productCreated.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price
    })
  })

  it("should update a product", async () => {
    const product = new Product("1", "product name", 100)
    const productRepository = new ProductRepository()
    await productRepository.create(product)

    product.changeName("new name")
    product.changePrice(200)

    await productRepository.update(product)
    const productFounded = await ProductModel.findOne({ where: { id: "1" } })

    if (!productFounded) {
      expect(false).toBeTruthy()
      return;
    }

    expect(productFounded.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price
    })
  })

  it("should find a product", async () => {
    const product = new Product("1", "product name", 10)
    const productRepository = new ProductRepository()

    await productRepository.create(product)

    const productModelFounded = await ProductModel.findOne({ where: { id: product.id } })
    const productRepositoryFounded = await productRepository.find(product.id)

    if (!productModelFounded) {
      expect(false).toBeTruthy()
      return;
    }

    expect({
      id: productModelFounded.id,
      name: productModelFounded.name,
      price: productModelFounded.price
    }).toEqual({
      id: productRepositoryFounded.id,
      name: productRepositoryFounded.name,
      price: productRepositoryFounded.price
    })
  })

  it("should find all products", async () => {
    const product1 = new Product("1", "product name1", 10)
    const product2 = new Product("2", "product name2", 20)
    const productRepository = new ProductRepository()

    await productRepository.create(product1)
    await productRepository.create(product2)

    const products = await productRepository.findAll();

    expect([product1, product2]).toEqual(products)
  })
})