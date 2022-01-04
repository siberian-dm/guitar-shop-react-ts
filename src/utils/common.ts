import { parse } from 'query-string';
import { QueryField } from '../const';

const BASE = 10;

const fillZero = (num: number, places: number) => {
  const zeroCount = places - num.toString().length;

  return zeroCount > 0
    ? `${Array(zeroCount).fill(0).join('')}${num}`
    : num.toString();
};

export const formatPrice = (price: number) => {
  const millions = Math.floor(price / 1e6);
  const thousands = Math.floor(price % 1e6 / 1000);
  const hundreds = price % 1000;

  const priceInMillions = millions !==0 ? millions : '';

  let priceInThousands: string | number;

  if (millions !==0) {
    priceInThousands = fillZero(thousands, 3);
  }
  else {
    priceInThousands = thousands !==0 ? thousands : '';
  }

  const priceInHundreds = millions !== 0 || thousands !==0 ? fillZero(hundreds, 3) : hundreds;

  return `${priceInMillions} ${priceInThousands} ${priceInHundreds} ₽`;
};

export const parseIntNumberFromString = (str: string) => {
  const parsedIntNumber = parseInt(str, BASE);

  if (isNaN(parsedIntNumber)) {
    return null;
  }

  return parsedIntNumber;
};

export const parsePageNumberFromString = (str: string | undefined) => {
  if (str === undefined) {
    return 1;
  }

  const parsedPageNumber = parseIntNumberFromString(str);

  if (parsedPageNumber === null) {
    return 1;
  }

  return parsedPageNumber;
};

export const parseArrayFromQueryByField = (query: URLSearchParams, field: QueryField) => {
  const queryString = query.toString();
  const parsedParams = parse(queryString)[field];

  if (!parsedParams) {
    return [];
  }
  else if (typeof parsedParams !== 'string') {
    return parsedParams;
  }
  else {
    return [parsedParams];
  }
};
