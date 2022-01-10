import { parseIntNumberFromString } from './common';

type TPriceRanges = {
  currentMin: string;
  currentMax: string;
  limitMin: number;
  limitMax: number;
}

export const validatePriceMin = ({ currentMin, currentMax, limitMin, limitMax }: TPriceRanges) => {
  let parsedMin = parseIntNumberFromString(currentMin);
  const parsedMax = parseIntNumberFromString(currentMax);

  if (parsedMin === null) {
    return '';
  }

  if (parsedMin < limitMin) {
    parsedMin = limitMin;
  }

  if (parsedMax !== null && parsedMin > parsedMax) {
    parsedMin = parsedMax;
  }

  if (parsedMax === null && parsedMin > limitMax) {
    parsedMin = limitMax;
  }

  return String(parsedMin);
};

export const validatePriceMax = ({ currentMin, currentMax, limitMin, limitMax }: TPriceRanges) => {
  let parsedMax = parseIntNumberFromString(currentMax);
  const parsedMin = parseIntNumberFromString(currentMin);

  if (parsedMax === null) {
    return '';
  }

  if (parsedMax > limitMax) {
    parsedMax = limitMax;
  }

  if (parsedMin !== null && parsedMax < parsedMin) {
    parsedMax = parsedMin;
  }

  if (parsedMin === null && parsedMax < limitMin) {
    parsedMax = limitMin;
  }

  return String(parsedMax);
};
