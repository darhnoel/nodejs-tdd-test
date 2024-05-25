const { assert } = require("chai");
const { Money, BankNote } = require("../currency.js");

describe("Money", () => {
  it("should have same currency equal", () => {
    assert(Money.franc(5).equals(Money.franc(5)), "5 CHF should equal 5 CHF");
    assert(Money.dollar(5).equals(Money.dollar(5)), "5 USD should equal 5 USD");
    assert.isFalse(
      Money.dollar(5).equals(Money.dollar(6)),
      "5 USD should not equal 6 USD"
    );
    assert.isFalse(
      Money.franc(5).equals(Money.dollar(5)),
      "5 CHF should not equal 5 USD"
    );
  });

  it("should have amount of multiplication equal", () => {
    assert(
      Money.franc(5).times(2).equals(Money.franc(10)),
      "5 CHF * 2 should equal 10 CHF"
    );
    assert(
      Money.dollar(5).times(2).equals(Money.dollar(10)),
      "5 USD * 2 should equal 10 USD"
    );
  });

  it("should have amount of addition equal", () => {
    assert(
      Money.franc(5).plus(Money.franc(2)).equals(Money.franc(7)),
      "5 CHF + 2 CHF should equal 7 CHF"
    );
    assert(
      Money.dollar(5).plus(Money.dollar(2)).equals(Money.dollar(7)),
      "5 USD + 2 USD should equal 7 USD"
    );
    assert.isFalse(
      Money.franc(5).plus(Money.dollar(2)).equals(Money.dollar(7)),
      "5 CHF + 2 USD should not equal 7 USD"
    );
  });
});

describe("BankNote", () => {
  it("should handle currency rate changes correctly", () => {
    const usd2usdRate = BankNote.rateChange("USD", "USD");
    const usd2jpyRate = BankNote.rateChange("USD", "JPY");
    const jpy2usdRate = BankNote.rateChange("JPY", "USD");

    assert.strictEqual(usd2usdRate, 1, "USD to USD rate should be 1");
    assert.closeTo(
      usd2jpyRate,
      1 / 0.0064,
      0.001,
      "USD to JPY rate should be close to 1 / 0.0064"
    );
    assert.closeTo(
      jpy2usdRate,
      0.0064,
      0.0001,
      "JPY to USD rate should be close to 0.0064"
    );
  });

  it("should reduce same currency correctly", () => {
    const bankUSD = BankNote.reduce(Money.dollar(1), "USD");
    assert(
      bankUSD.equals(Money.dollar(1)),
      "Reducing 1 USD to USD should be 1 USD"
    );
  });

  it("should reduce different currencies correctly", () => {
    const bankJPY = BankNote.reduce(Money.yen(156), "JPY");
    const bankUSD2JPY = BankNote.reduce(Money.dollar(1), "JPY");
    const bankUSD2CHF = BankNote.reduce(Money.dollar(1), "CHF");
    const bankCHF2USD = BankNote.reduce(Money.franc(1), "USD");

    assert(
      bankJPY.equals(Money.yen(156)),
      "Reducing 156 JPY to JPY should be 156 JPY"
    );
    assert.closeTo(
      bankUSD2JPY.getAmount(),
      156,
      0.3,
      "Reducing 1 USD to JPY should be close to 156 JPY"
    );
    assert.closeTo(
      bankUSD2CHF.getAmount(),
      1 / 1.09,
      0.1,
      "Reducing 1 USD to CHF should be close to 1 / 1.09 CHF"
    );
    assert.closeTo(
      bankCHF2USD.getAmount(),
      1.09,
      0.1,
      "Reducing 1 CHF to USD should be close to 1.09 USD"
    );
  });
});
