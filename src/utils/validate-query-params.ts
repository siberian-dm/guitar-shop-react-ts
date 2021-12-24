import { parse, ParsedQuery, stringify } from 'query-string';
import { QueryField, SortOrder, SortType } from '../const';
/* eslint-disable no-console */

const validConstParams = {
  [QueryField.Sort]: [SortType.Price as string, SortType.Rating as string],
  [QueryField.Order]: [SortOrder.Ascending as string, SortOrder.Descending as string],
  // [QueryField.Type]: [GuitarType.Acoustic as string, GuitarType.Electric as string, GuitarType.Ukulele as string],
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

export const validateQueryParams = (query: URLSearchParams) => {
  const prevQueryString = query.toString();
  let validatedQueryString = prevQueryString;

  if (prevQueryString) {
    const parsed = parse(prevQueryString);

    const validatedParamKeys = validateParamKeys(parsed);
    const validatedSortParams = validateSortParams(validatedParamKeys);

    validatedQueryString = stringify(validatedSortParams, {skipNull: true});
  }

  console.log('old', prevQueryString);
  console.log('new', validatedQueryString);

  const isStringify = prevQueryString !== validatedQueryString;

  return {queryString: validatedQueryString, isStringify};
};
