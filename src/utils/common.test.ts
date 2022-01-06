import { formatPrice, parseArrayFromQueryByField, parseIntNumberFromString } from './common';

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

describe('Function: parseArrayFromQueryByField', () => {
  const queryString = 'key1=value1&key1=value2&key1=value3&key2=value1';
  const query = new URLSearchParams(queryString);

  it('should return "["value1", "value2", "value3"]" when field is "key1"', () => {
    expect(parseArrayFromQueryByField(query, 'key1')).toStrictEqual(['value1', 'value2', 'value3']);
  });
  it('should return "["value1"]" when field is "key2"', () => {
    expect(parseArrayFromQueryByField(query, 'key2')).toStrictEqual(['value1']);
  });
  it('should return "[]" when field is "key3"', () => {
    expect(parseArrayFromQueryByField(query, 'key3')).toStrictEqual([]);
  });
});
