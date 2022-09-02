import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({ tableName: "customers", timestamps: false })
export default class CustomerModel extends Model {

  @PrimaryKey
  @Column
  declare id: string

  @Column({ allowNull: false })
  declare name: string

  @Column({ allowNull: false })
  declare email: string

  @Column({ allowNull: true })
  declare street: string

  @Column
  declare city: string

  @Column
  declare zip: string

  @Column
  declare number: number
}
