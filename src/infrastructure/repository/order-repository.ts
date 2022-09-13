import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import RepositoryInterface from "../../domain/repository/repository-interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements RepositoryInterface<Order> {
  async create(entity: Order): Promise<void> {
    try {
      await OrderModel.create({
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map(item => {
          return {
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
            order_id: entity.id
          }
        })
      }, {
        include: [{ model: OrderItemModel }]
      })

    } catch (error) {
      throw new Error("Error when creating order")
    }
  }
  update(entity: Order): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async find(id: string): Promise<Order> {
    try {
      const order = await OrderModel.findOne({ where: { id }, rejectOnEmpty: true, include: [OrderItemModel] })
      const items = order.items.map(item => {
        return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
      })
      return new Order(
        order.id,
        order.customer_id,
        items
      )
    } catch (error) {
      throw new Error("Order not found")
    }
  }
  findAll(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }

}