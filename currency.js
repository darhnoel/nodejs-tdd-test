class Money {
  // exchangeRate compared with USD as standard
  static exchangeRate = {
    USD: 1,
    CHF: 1.09,
    JPY: 0.0064,
  };

  static franc(amount) {
    return new Money(amount, "CHF");
  }

  static dollar(amount) {
    return new Money(amount, "USD");
  }

  static yen(amount) {
    return new Money(amount, "JPY");
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

  plus(other) {
    if (this.getCurrency() === other.getCurrency()) {
      return new Money(this.amount + other.amount, this.getCurrency());
    }
    // Convert other to this currency
    const convertedAmount = BankNote.reduce(
      other,
      this.getCurrency()
    ).getAmount();
    return new Money(this.amount + convertedAmount, this.getCurrency());
  }
}

class BankNote extends Money {
  static rateChange(from, to) {
    if (from === to) return 1;
    const rate1 = Money.exchangeRate[from];
    const rate2 = Money.exchangeRate[to];
    return rate1 / rate2;
  }

  static reduce(source, to) {
    if (source.getCurrency() !== to) {
      const rate = BankNote.rateChange(source.getCurrency(), to);
      return new Money(source.getAmount() * rate, to);
    } else {
      return source;
    }
  }
}

module.exports = {
  BankNote,
  Money,
};
