import { validatePriceMax, validatePriceMin } from './validate-price';

describe('Function: validatePriceMin', () => {
  const priceRangesMock = {
    currentMin: '',
    currentMax: '15000',
    limitMin: 1700,
    limitMax: 35000,
  };

  it('should return "1800" when currentMin is "1800"', () => {
    const priceRanges = {
      ...priceRangesMock,
      currentMin: '1800',
    };
    expect(validatePriceMin(priceRanges)).toBe('1800');
  });

  it('should return "1700" when currentMin is "1000"', () => {
    const priceRanges = {
      ...priceRangesMock,
      currentMin: '1000',
    };
    expect(validatePriceMin(priceRanges)).toBe('1700');
  });

  it('should return "15000" when currentMin is "30000"', () => {
    const priceRanges = {
      ...priceRangesMock,
      currentMin: '30000',
    };
    expect(validatePriceMin(priceRanges)).toBe('15000');
  });

  it('should return "35000" when currentMin is "40000" and currentMax is ""', () => {
    const priceRanges = {
      ...priceRangesMock,
      currentMin: '40000',
      currentMax: '',
    };
    expect(validatePriceMin(priceRanges)).toBe('35000');
  });

  it('should return "" when currentMin is ""', () => {
    const priceRanges = {
      ...priceRangesMock,
    };
    expect(validatePriceMin(priceRanges)).toBe('');
  });
});

describe('Function: validatePriceMax', () => {
  const priceRangesMock = {
    currentMin: '1800',
    currentMax: '',
    limitMin: 1700,
    limitMax: 35000,
  };

  it('should return "15000" when currentMax is "15000"', () => {
    const priceRanges = {
      ...priceRangesMock,
      currentMax: '15000',
    };
    expect(validatePriceMax(priceRanges)).toBe('15000');
  });

  it('should return "35000" when currentMax is "45000"', () => {
    const priceRanges = {
      ...priceRangesMock,
      currentMax: '45000',
    };
    expect(validatePriceMax(priceRanges)).toBe('35000');
  });

  it('should return "1800" when currentMax is "1700"', () => {
    const priceRanges = {
      ...priceRangesMock,
      currentMax: '1700',
    };
    expect(validatePriceMax(priceRanges)).toBe('1800');
  });

  it('should return "1700" when currentMax is "1500" and currentMin is ""', () => {
    const priceRanges = {
      ...priceRangesMock,
      currentMin: '',
      currentMax: '1500',
    };
    expect(validatePriceMax(priceRanges)).toBe('1700');
  });

  it('should return "" when currentMax is ""', () => {
    const priceRanges = {
      ...priceRangesMock,
    };
    expect(validatePriceMax(priceRanges)).toBe('');
  });
});
