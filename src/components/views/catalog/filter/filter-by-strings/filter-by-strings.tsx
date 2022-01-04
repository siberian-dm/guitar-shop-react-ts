import useQuery from '../../../../../hooks/use-query';
import { ChangeEvent, useEffect, useState } from 'react';
import { getCatalogRouteWithCurrentPage } from '../../../../../store/reducers/catalog-slice/selectors';
import { GuitarType, QueryField, StringCount } from '../../../../../const';
import { parse, stringify } from 'query-string';
import { parseArrayFromQueryByField } from '../../../../../utils/common';
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

  const queryStringCounts = parseArrayFromQueryByField(query, QueryField.StringCount);
  const queryTypes = parseArrayFromQueryByField(query, QueryField.Type);

  const isAcousticCheck = queryTypes.includes(GuitarType.Acoustic);
  const isElectricCheck = queryTypes.includes(GuitarType.Electric);
  const isUkuleleCheck = queryTypes.includes(GuitarType.Ukulele);

  const isFourStringsDisabled = !isUkuleleCheck && !isElectricCheck && isAcousticCheck;
  const isSixStringsDisabled = !isElectricCheck && !isAcousticCheck && isUkuleleCheck;
  const isSevenStringsDisabled = !isElectricCheck && !isAcousticCheck && isUkuleleCheck;
  const isTwelveStringsDisabled = !isAcousticCheck && (isUkuleleCheck || isElectricCheck);

  const [isFourStringsCheck, setIsFourStringsCheck] = useState(false);
  const [isSixStringsCheck, setIsSixStringsCheck] = useState(false);
  const [isSevenStringsCheck, setIsSevenStringsCheck] = useState(false);
  const [isTwelveStringsCheck, setIsTwelveStringsCheck] = useState(false);

  useEffect(() => {
    setIsFourStringsCheck(
      queryStringCounts.includes(StringCount.Four) && !isFourStringsDisabled,
    );
    setIsSixStringsCheck(
      queryStringCounts.includes(StringCount.Six) && !isSixStringsDisabled,
    );
    setIsSevenStringsCheck(
      queryStringCounts.includes(StringCount.Seven) && !isSevenStringsDisabled,
    );
    setIsTwelveStringsCheck(
      queryStringCounts.includes(StringCount.Twelve) && !isTwelveStringsDisabled,
    );
  },
  [
    isFourStringsDisabled,
    isSevenStringsDisabled,
    isSixStringsDisabled,
    isTwelveStringsDisabled,
    queryStringCounts,
  ]);

  useEffect(() => {
    const queryString = query.toString();
    const newQueryString = stringify(
      {
        ...parse(queryString),
        [QueryField.StringCount]: [
          `${isFourStringsCheck ? StringCount.Four : ''}`,
          `${isSixStringsCheck ? StringCount.Six : ''}`,
          `${isSevenStringsCheck ? StringCount.Seven : ''}`,
          `${isTwelveStringsCheck ? StringCount.Twelve : ''}`,
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
    isSevenStringsCheck,
    isSixStringsCheck,
    isTwelveStringsCheck,
    query,
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
