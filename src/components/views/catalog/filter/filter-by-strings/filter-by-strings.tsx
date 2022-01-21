import { ArrayParam, useQueryParam, withDefault } from 'use-query-params';
import { ChangeEvent, useEffect, useState } from 'react';
import { GuitarType, QueryField, StringCount } from '../../../../../const';

const enum CheckBoxName {
  FourStrings = '4-strings',
  SixStrings = '6-strings',
  SevenStrings = '7-strings',
  TwelveStrings = '12-strings',
}

function FilterByStrings(): JSX.Element {
  const [isFourStringsCheck, setIsFourStringsCheck] = useState(false);
  const [isSixStringsCheck, setIsSixStringsCheck] = useState(false);
  const [isSevenStringsCheck, setIsSevenStringsCheck] = useState(false);
  const [isTwelveStringsCheck, setIsTwelveStringsCheck] = useState(false);

  const [queryTypes] = useQueryParam(
    QueryField.Type,
    withDefault(ArrayParam, [] as string[]),
  );
  const [queryStringCounts, setQueryStringCounts] = useQueryParam(
    QueryField.StringCount,
    withDefault(ArrayParam, [] as string[]),
  );

  const isAcousticCheck = queryTypes.includes(GuitarType.Acoustic);
  const isElectricCheck = queryTypes.includes(GuitarType.Electric);
  const isUkuleleCheck = queryTypes.includes(GuitarType.Ukulele);

  const isFourStringsDisabled = !isUkuleleCheck && !isElectricCheck && isAcousticCheck;
  const isSixStringsDisabled = !isElectricCheck && !isAcousticCheck && isUkuleleCheck;
  const isSevenStringsDisabled = !isElectricCheck && !isAcousticCheck && isUkuleleCheck;
  const isTwelveStringsDisabled = !isAcousticCheck && (isUkuleleCheck || isElectricCheck);

  useEffect(() => {
    setIsFourStringsCheck(queryStringCounts.includes(StringCount.Four) && !isFourStringsDisabled);
    setIsSixStringsCheck(queryStringCounts.includes(StringCount.Six) && !isSixStringsDisabled);
    setIsSevenStringsCheck(queryStringCounts.includes(StringCount.Seven) && !isSevenStringsDisabled);
    setIsTwelveStringsCheck(queryStringCounts.includes(StringCount.Twelve) && !isTwelveStringsDisabled);
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [
    isFourStringsDisabled,
    isSevenStringsDisabled,
    isSixStringsDisabled,
    isTwelveStringsDisabled,
  ]);

  useEffect(() => {
    const newQueryStringCounts = [
      `${isFourStringsCheck && !isFourStringsDisabled? StringCount.Four : ''}`,
      `${isSixStringsCheck && !isSixStringsDisabled? StringCount.Six : ''}`,
      `${isSevenStringsCheck && !isSevenStringsDisabled? StringCount.Seven : ''}`,
      `${isTwelveStringsCheck && !isTwelveStringsDisabled? StringCount.Twelve : ''}`,
    ].filter((item) => item !== '');

    setQueryStringCounts(newQueryStringCounts);
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [
    isFourStringsCheck,
    isFourStringsDisabled,
    isSevenStringsCheck,
    isSevenStringsDisabled,
    isSixStringsCheck,
    isSixStringsDisabled,
    isTwelveStringsCheck,
    isTwelveStringsDisabled,
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
    <fieldset
      data-testid="filter-by-strings"
      className="catalog-filter__block"
    >
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
