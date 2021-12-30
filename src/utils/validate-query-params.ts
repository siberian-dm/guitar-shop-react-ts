import { parse, ParsedQuery, stringify } from 'query-string';
import { parseIntNumberFromString } from './common';
import { QueryField, SortOrder, SortType } from '../const';

const validConstParams = {
  [QueryField.Sort]: [SortType.Price as string, SortType.Rating as string],
  [QueryField.Order]: [SortOrder.Ascending as string, SortOrder.Descending as string],
};

const validateParamKeys = (parsed: ParsedQuery) => {
  const validKeys: string[] = Object.values(QueryField);

  Object.keys(parsed).forEach((key) =>  {
    if (!validKeys.includes(key)) {
      delete parsed[key];
    }
  });

  return parsed;
};

const validateSortParams = (parsed: ParsedQuery) => {
  const sortType = parsed[QueryField.Sort];
  const sortOrder = parsed[QueryField.Order];

  if (sortType === undefined || sortOrder === undefined) {
    parsed[QueryField.Sort] = null;
    parsed[QueryField.Order] = null;

    return parsed;
  }

  if (sortType && sortOrder) {
    parsed[QueryField.Sort] =
      validConstParams[QueryField.Sort]
        .includes(sortType as string)
        ? sortType
        : SortType.Price;

    parsed[QueryField.Order] =
      validConstParams[QueryField.Order]
        .includes(sortOrder as string)
        ? sortOrder
        : SortOrder.Ascending;
  }

  return parsed;
};

const validatePriceParams = (parsed: ParsedQuery) => {
  const priceMin = parsed[QueryField.PriceMin];
  const priceMax = parsed[QueryField.PriceMax];

  const parsedPriceMin = parseIntNumberFromString(String(priceMin));
  parsed[QueryField.PriceMin] = parsedPriceMin !== null ? String(parsedPriceMin) : null;

  const parsedPriceMax = parseIntNumberFromString(String(priceMax));
  parsed[QueryField.PriceMax] = parsedPriceMax !== null ? String(parsedPriceMax) : null;

  return parsed;
};

export const validateQueryParams = (query: URLSearchParams) => {
  const prevQueryString = query.toString();
  let validatedQueryString = prevQueryString;

  if (prevQueryString) {
    const parsed = parse(prevQueryString);

    const validatedStep1 = validateParamKeys(parsed);
    const validatedStep2 = validateSortParams(validatedStep1);
    const validatedStep3 = validatePriceParams(validatedStep2);

    validatedQueryString = stringify(validatedStep3, {
      skipNull: true,
      skipEmptyString: true,
    });
  }

  const isChanged = prevQueryString !== validatedQueryString;

  return {queryString: validatedQueryString, isChanged};
};
