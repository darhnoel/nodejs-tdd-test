const { assert } = require("chai");
const { Money } = require("../currency.js");

describe("Money", () => {
  it("should have same currency equal", () => {
    assert(Money.franc(5).equals(Money.franc(5)));
    assert(Money.dollar(5).equals(Money.dollar(5)));
    assert.isFalse(Money.dollar(5).equals(Money.dollar(6)));
    assert.isFalse(Money.franc(5).equals(Money.dollar(5)));
  });

  it("should have amount of multiplication equal", () => {
    assert(Money.franc(5).times(2).getAmount() === 10);
    assert(Money.dollar(5).times(2).getAmount() === 10);
  });
});
