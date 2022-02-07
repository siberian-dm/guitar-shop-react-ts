const BASE = 10;
const ONE_MILLION = 1e6;
const ONE_THOUSAND = 1000;
const NUMBER_COUNT = 3;

const fillZero = (num: number) => {
  const zeroCount = NUMBER_COUNT - num.toString().length;

  return zeroCount > 0
    ? `${Array(zeroCount).fill(0).join('')}${num}`
    : num.toString();
};

export const formatPrice = (price: number) => {
  const millions = Math.floor(price / ONE_MILLION);
  const thousands = Math.floor(price % ONE_MILLION / ONE_THOUSAND);
  const hundreds = price % ONE_THOUSAND;

  const priceInMillions = millions !==0 ? millions : '';

  let priceInThousands: string | number;

  if (millions !==0) {
    priceInThousands = fillZero(thousands);
  }
  else {
    priceInThousands = thousands !== 0 ? thousands : '';
  }

  const priceInHundreds = millions !== 0 || thousands !== 0 ? fillZero(hundreds) : hundreds;

  return `${priceInMillions} ${priceInThousands} ${priceInHundreds} ₽`.trim();
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
