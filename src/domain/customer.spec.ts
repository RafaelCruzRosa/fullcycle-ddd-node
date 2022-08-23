import { Customer } from "./customer";

describe("Customer domain", () => {
  it("Should validate name", () => {
    const customer = new Customer("123", "", "email@email.com");
  });
});
