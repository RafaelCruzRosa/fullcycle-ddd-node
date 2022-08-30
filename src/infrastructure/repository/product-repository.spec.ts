import { Sequelize } from "sequelize-typescript"

describe("Product repository test", () => {
  let sequelize: Sequelize
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      database: ":memory:",
      logging: false,
    })
  })

  afterEach(async () => {
    await sequelize.close()
  })
})