import useQuery from '../../../../../hooks/use-query';
import { ChangeEvent, useEffect, useState } from 'react';
import { getCatalogRouteWithCurrentPage } from '../../../../../store/reducers/catalog-slice/selectors';
import { GuitarType, QueryField, StringCount } from '../../../../../const';
import { parse, stringify } from 'query-string';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const enum CheckBoxName {
  FourStrings = '4-strings',
  SixStrings = '6-strings',
  SevenStrings = '7-strings',
  TwelveStrings = '12-strings',
}

function FilterByStrings(): JSX.Element {
  const query = useQuery();
  const history = useHistory();
  const catalogRouteWithCurrentPage = useSelector(getCatalogRouteWithCurrentPage);

  const queryString = query.toString();
  const parsedQueryStringCounts = parse(queryString)[QueryField.StringCount];
  const parsedQueryTypes = parse(queryString)[QueryField.Type];

  const queryStringCounts = parsedQueryStringCounts && typeof parsedQueryStringCounts !== 'string'
    ? parsedQueryStringCounts
    : [parsedQueryStringCounts];

  const queryTypes = parsedQueryTypes && typeof parsedQueryTypes !== 'string'
    ? parsedQueryTypes
    : [parsedQueryTypes];

  const isAcousticCheck = queryTypes.includes(GuitarType.Acoustic);
  const isElectricCheck = queryTypes.includes(GuitarType.Electric);
  const isUkuleleCheck = queryTypes.includes(GuitarType.Ukulele);

  const isFourStringsDisabled = !isUkuleleCheck && !isElectricCheck && isAcousticCheck;
  const isSixStringsDisabled = !isElectricCheck && !isAcousticCheck && isUkuleleCheck;
  const isSevenStringsDisabled = !isElectricCheck && !isAcousticCheck && isUkuleleCheck;
  const isTwelveStringsDisabled = !isAcousticCheck && (isUkuleleCheck || isElectricCheck);

  const [isFourStringsCheck, setIsFourStringsCheck] = useState(
    queryStringCounts.includes(StringCount.Four) && !isFourStringsDisabled,
  );
  const [isSixStringsCheck, setIsSixStringsCheck] = useState(
    queryStringCounts.includes(StringCount.Six) && !isSixStringsDisabled,
  );
  const [isSevenStringsCheck, setIsSevenStringsCheck] = useState(
    queryStringCounts.includes(StringCount.Seven) && !isSevenStringsDisabled,
  );
  const [isTwelveStringsCheck, setIsTwelveStringsCheck] = useState(
    queryStringCounts.includes(StringCount.Twelve) && !isTwelveStringsDisabled,
  );

  useEffect(() => {
    const newQueryString = stringify(
      {
        ...parse(queryString),
        [QueryField.StringCount]: [
          `${isFourStringsCheck && !isFourStringsDisabled ? StringCount.Four : ''}`,
          `${isSixStringsCheck && !isSixStringsDisabled ? StringCount.Six : ''}`,
          `${isSevenStringsCheck && !isSevenStringsDisabled ? StringCount.Seven : ''}`,
          `${isTwelveStringsCheck && !isTwelveStringsDisabled ? StringCount.Twelve : ''}`,
        ],
      },
      {skipEmptyString: true},
    );

    if (newQueryString !== queryString) {
      history.push(`${catalogRouteWithCurrentPage}?${newQueryString}`);
    }
  },
  [
    catalogRouteWithCurrentPage,
    history,
    isFourStringsCheck,
    isFourStringsDisabled,
    isSevenStringsCheck,
    isSevenStringsDisabled,
    isSixStringsCheck,
    isSixStringsDisabled,
    isTwelveStringsCheck,
    isTwelveStringsDisabled,
    queryString,
  ]);

  const onCheckboxChange = (evt: ChangeEvent) => {
    switch (evt.target.id) {
      case CheckBoxName.FourStrings:
        setIsFourStringsCheck((prev) => !prev);
        break;
      case CheckBoxName.SixStrings:
        setIsSixStringsCheck((prev) => !prev);
        break;
      case CheckBoxName.SevenStrings:
        setIsSevenStringsCheck((prev) => !prev);
        break;
      case CheckBoxName.TwelveStrings:
        setIsTwelveStringsCheck((prev) => !prev);
    }
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Количество струн</legend>
      <div className="form-checkbox catalog-filter__block-item">
        <input
          className="visually-hidden"
          type="checkbox"
          id={CheckBoxName.FourStrings}
          name={CheckBoxName.FourStrings}
          checked={isFourStringsCheck}
          disabled={isFourStringsDisabled}
          onChange={onCheckboxChange}
        />
        <label htmlFor={CheckBoxName.FourStrings}>4</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input
          className="visually-hidden"
          type="checkbox"
          id={CheckBoxName.SixStrings}
          name={CheckBoxName.SixStrings}
          checked={isSixStringsCheck}
          disabled={isSixStringsDisabled}
          onChange={onCheckboxChange}
        />
        <label htmlFor={CheckBoxName.SixStrings}>6</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input
          className="visually-hidden"
          type="checkbox"
          id={CheckBoxName.SevenStrings}
          name={CheckBoxName.SevenStrings}
          checked={isSevenStringsCheck}
          disabled={isSevenStringsDisabled}
          onChange={onCheckboxChange}
        />
        <label htmlFor={CheckBoxName.SevenStrings}>7</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input
          className="visually-hidden"
          type="checkbox"
          id={CheckBoxName.TwelveStrings}
          name={CheckBoxName.TwelveStrings}
          checked={isTwelveStringsCheck}
          disabled={isTwelveStringsDisabled}
          onChange={onCheckboxChange}
        />
        <label htmlFor={CheckBoxName.TwelveStrings}>12</label>
      </div>
    </fieldset>
  );
}

export default FilterByStrings;
