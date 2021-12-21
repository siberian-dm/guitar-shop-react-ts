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