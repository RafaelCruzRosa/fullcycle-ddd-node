import { Sequelize } from "sequelize-typescript"
import { Customer } from "../../domain/entity/customer"
import Order from "../../domain/entity/order"
import OrderItem from "../../domain/entity/order_item"
import Product from "../../domain/entity/product"
import Address from "../../domain/entity/valueObjects/address"
import CustomerModel from "../db/sequelize/model/customer.model"
import OrderItemModel from "../db/sequelize/model/order-item.model"
import OrderModel from "../db/sequelize/model/order.model"
import ProductModel from "../db/sequelize/model/product.model"
import CustomerRepository from "./customer-repository"
import OrderRepository from "./order-repository"
import ProductRepository from "./product-repository"

describe("Order Repository test", () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([OrderModel, OrderItemModel, ProductModel, CustomerModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should be able to create an order", async () => {
    const productRepository = new ProductRepository()
    const product = new Product("1", "product name", 100)
    await productRepository.create(product)

    const customerRepository = new CustomerRepository()
    const customer = new Customer("1", "customer name", "customer@customer.com", new Address("street", 1, "123", "city"))
    await customerRepository.create(customer)

    const orderItem = new OrderItem("1", "order item", 10, product.id, 2)

    const order = new Order("1", customer.id, [orderItem])
    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderFinded = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] })

    if (!orderFinded) {
      expect(true).toBeFalsy()
      throw new Error("Error in test")
    }

    expect(orderFinded.toJSON()).toEqual({
      id: order.id,
      total: order.total(),
      customer_id: customer.id,
      items: [{
        id: orderItem.id,
        order_id: order.id,
        name: orderItem.name,
        price: orderItem.price,
        product_id: orderItem.productId,
        quantity: orderItem.quantity
      }]
    })
  })

  it("should be able to find and order", async () => {
    const productRepository = new ProductRepository()
    const product = new Product("1", "product name", 100)
    await productRepository.create(product)

    const customerRepository = new CustomerRepository()
    const customer = new Customer("1", "customer name", "customer@customer.com", new Address("street", 1, "123", "city"))
    await customerRepository.create(customer)

    const orderItem = new OrderItem("1", "order item", 10, product.id, 2)

    const order = new Order("1", customer.id, [orderItem])
    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderModelFinded = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] })
    const orderFinded = await orderRepository.find(order.id)

    if (!orderModelFinded) {
      expect(true).toBeFalsy()
      throw new Error("Error in test")
    }

    expect({
      id: orderFinded.id,
      customerId: orderFinded.customerId,
      items: [{
        id: orderItem.id,
        name: orderItem.name,
        price: orderItem.price,
        productId: orderItem.productId,
        quantity: orderItem.quantity
      }]
    }).toStrictEqual({
      id: orderModelFinded.id,
      customerId: orderModelFinded.customer_id,
      items: [{
        id: orderItem.id,
        name: orderItem.name,
        price: orderItem.price,
        productId: orderItem.productId,
        quantity: orderItem.quantity
      }]
    })

  })
  it("should throw if order not found", async () => {
    const orderRepository = new OrderRepository()

    expect(async () => {
      await orderRepository.find("ABC")
    }).rejects.toThrow("Order not found")

  })

  it("should be able to find all orders", async () => {
    const productRepository = new ProductRepository()
    const product = new Product("1", "product name", 100)
    await productRepository.create(product)

    const customerRepository = new CustomerRepository()
    const customer = new Customer("1", "customer name", "customer@customer.com", new Address("street", 1, "123", "city"))
    await customerRepository.create(customer)

    const orderItem1 = new OrderItem("1", "order item", 10, product.id, 2)
    const orderItem2 = new OrderItem("2", "order item", 10, product.id, 2)

    const order1 = new Order("1", customer.id, [orderItem1])
    const order2 = new Order("2", customer.id, [orderItem2])

    const orderRepository = new OrderRepository()

    await orderRepository.create(order1)
    await orderRepository.create(order2)


    const ordersFinded = await orderRepository.findAll();
    expect([order1, order2]).toEqual(ordersFinded)
  })

  it("should be able to update an order", async () => {
    const productRepository = new ProductRepository()
    const product = new Product("1", "product name", 100)
    await productRepository.create(product)

    const customerRepository = new CustomerRepository()
    const customer = new Customer("1", "customer name", "customer@customer.com", new Address("street", 1, "123", "city"))
    await customerRepository.create(customer)

    const orderItem1 = new OrderItem("1", "order item", 10, product.id, 2)
    const orderItem2 = new OrderItem("2", "order item", 10, product.id, 2)

    const order = new Order("1", customer.id, [orderItem1])


    const orderRepository = new OrderRepository()

    await orderRepository.create(order)

    expect(order.items).toEqual([orderItem1])

    order.addItem(orderItem2)
    await orderRepository.update(order)

    expect(order.items).toEqual([orderItem1, orderItem2])
  })
})