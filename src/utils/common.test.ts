import { formatPrice, parseIntNumberFromString } from './common';

describe('Function: formatPrice', () => {
  it('should return "1 010 009 ₽" when price is 1010009', () => {
    expect(formatPrice(1010009)).toBe('1 010 009 ₽');
  });
  it('should return "10 009 ₽" when price is 10009', () => {
    expect(formatPrice(10009)).toBe('10 009 ₽');
  });
  it('should return "50 ₽" when price is 50', () => {
    expect(formatPrice(50)).toBe('50 ₽');
  });
});

describe('Function: parseIntNumberFromString', () => {
  it('should return 25 when string is "25"', () => {
    expect(parseIntNumberFromString('25')).toBe(25);
  });
  it('should return 25 when string is "25abc"', () => {
    expect(parseIntNumberFromString('25abc')).toBe(25);
  });
  it('should return null when string is "abc25"', () => {
    expect(parseIntNumberFromString('abc25')).toBe(null);
  });
  it('should return null when string is ""', () => {
    expect(parseIntNumberFromString('')).toBe(null);
  });
});
