const BASE = 10;

type TPriceRange = {
  min: number;
  max: number;
}

export const validatePriceMin = (currentMin: string, currentMax: string, validPriceRange: TPriceRange) => {
  let min = parseInt(currentMin, BASE);
  const max = parseInt(currentMax, BASE);

  if (isNaN(min)) {
    return '';
  }

  if (min < validPriceRange.min) {
    min = validPriceRange.min;
  }

  if (!isNaN(max) && min > max) {
    min = max;
  }

  if (isNaN(max) && min > validPriceRange.max) {
    min = validPriceRange.max;
  }

  return String(min);
};

export const validatePriceMax = (currentMin: string, currentMax: string, validPriceRange: TPriceRange) => {
  let max = parseInt(currentMax, BASE);
  const min = parseInt(currentMin, BASE);

  if (isNaN(max)) {
    return '';
  }

  if (max > validPriceRange.max) {
    max = validPriceRange.max;
  }

  if (!isNaN(min) && min > max) {
    max = min;
  }

  if (isNaN(min) && max < validPriceRange.min) {
    max = validPriceRange.min;
  }

  return String(max);
};
