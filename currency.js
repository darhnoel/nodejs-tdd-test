class Money {
  static franc(amount) {
    return new Money(amount, "CHF");
  }

  static dollar(amount) {
    return new Money(amount, "USD");
  }

  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
  }

  getCurrency() {
    return this.currency;
  }

  getAmount() {
    return this.amount;
  }

  equals(other) {
    return (
      this.amount === other.amount && this.getCurrency() === other.getCurrency()
    );
  }

  times(multiplier) {
    return new Money(this.amount * multiplier, this.getCurrency());
  }
}

module.exports = {
  Money,
};
