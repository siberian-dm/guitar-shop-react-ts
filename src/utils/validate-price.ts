const BASE = 10;

type TPriceRanges = {
  currentMin: string;
  currentMax: string;
  limitMin: number;
  limitMax: number;
}

export const validatePriceMin = ({ currentMin, currentMax, limitMin, limitMax }: TPriceRanges) => {
  let min = parseInt(currentMin, BASE);
  const max = parseInt(currentMax, BASE);

  if (isNaN(min)) {
    return '';
  }

  if (min < limitMin) {
    min = limitMin;
  }

  if (!isNaN(max) && min > max) {
    min = max;
  }

  if (isNaN(max) && min > limitMax) {
    min = limitMax;
  }

  return String(min);
};

export const validatePriceMax = ({ currentMin, currentMax, limitMin, limitMax }: TPriceRanges) => {
  let max = parseInt(currentMax, BASE);
  const min = parseInt(currentMin, BASE);

  if (isNaN(max)) {
    return '';
  }

  if (max > limitMax) {
    max = limitMax;
  }

  if (!isNaN(min) && min > max) {
    max = min;
  }

  if (isNaN(min) && max < limitMin) {
    max = limitMin;
  }

  return String(max);
};
