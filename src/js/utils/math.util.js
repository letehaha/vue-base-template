import { Decimal } from 'decimal.js';

const DECIMAL_PLACES = 2;

export class MathUtil {
  static multiply(a, b, ROUND_TYPE = Decimal.ROUND_DOWN) {
    Decimal.set({ rounding: ROUND_TYPE });

    const decA = new Decimal(a);
    const decB = new Decimal(b);

    return decA.mul(decB).toFixed(DECIMAL_PLACES);
  }

  static divide(a, b, ROUND_TYPE = Decimal.ROUND_DOWN) {
    Decimal.set({ rounding: ROUND_TYPE });

    const decA = new Decimal(a);
    const decB = new Decimal(b);

    return decA.div(decB).toFixed(DECIMAL_PLACES);
  }

  static subtract(a, b, ROUND_TYPE = Decimal.ROUND_DOWN) {
    Decimal.set({ rounding: ROUND_TYPE });

    const decA = new Decimal(a);
    const decB = new Decimal(b);

    return decA.sub(decB).toFixed(DECIMAL_PLACES);
  }

  static add(a, b, ROUND_TYPE = Decimal.ROUND_DOWN) {
    Decimal.set({ rounding: ROUND_TYPE });

    const decA = new Decimal(a);
    const decB = new Decimal(b);

    return decA.plus(decB).toFixed(DECIMAL_PLACES);
  }

  static addAll(a, b = [], ROUND_TYPE = Decimal.ROUND_DOWN) {
    Decimal.set({ rounding: ROUND_TYPE });

    const result = new Decimal(a);

    return b
      .reduce(
        (acc, curr) => new Decimal(acc)
          .plus(new Decimal(curr))
          .toFixed(DECIMAL_PLACES),
        result,
      );
  }

  // a > b => 1
  // a < b => -1
  // a === b => 0
  static compare(a, b) {
    const decA = new Decimal(a);
    const decB = new Decimal(b);

    return decA.comparedTo(decB);
  }

  static random(min, max) {
    const tempMin = Math.ceil(min);
    const tempMax = Math.floor(max);
    return Math.floor(Math.random() * (tempMax - tempMin)) + tempMin;
  }

  static format(a) {
    return new Decimal(a).toFixed(DECIMAL_PLACES);
  }

  static isValidNumber(v) {
    return !!Number(v);
  }
}
