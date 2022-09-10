import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import CustomerModel from "./customer.model";
import OrderItemModel from "./order-item.model";

@Table({ tableName: "orders", timestamps: false })
export default class OrderModel extends Model {
  @PrimaryKey
  @Column
  declare id: number

  @Column({ allowNull: false })
  @ForeignKey(() => CustomerModel)
  declare customer_id: number

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel

  @Column({ allowNull: false })
  declare total: number

  @HasMany(() => OrderItemModel)
  declare items: OrderItemModel[]
}