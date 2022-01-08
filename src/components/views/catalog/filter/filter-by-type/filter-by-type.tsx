import { ArrayParam, useQueryParam, withDefault } from 'use-query-params';
import { ChangeEvent, useEffect, useState } from 'react';
import { GuitarType, QueryField, StringCount } from '../../../../../const';

const enum CheckBoxName {
  Acoustic = 'acoustic',
  Electric = 'electric',
  Ukulele = 'ukulele',
}

function FilterByType(): JSX.Element {
  const [queryTypes, setQueryTypes] = useQueryParam(
    QueryField.Type,
    withDefault(ArrayParam, [] as string[]),
  );
  const [queryStringCounts] = useQueryParam(
    QueryField.StringCount,
    withDefault(ArrayParam, [] as string[]),
  );

  const isFourStringsCheck = queryStringCounts.includes(StringCount.Four);
  const isSixStringsCheck = queryStringCounts.includes(StringCount.Six);
  const isSevenStringsCheck = queryStringCounts.includes(StringCount.Seven);
  const isTwelveStringsCheck = queryStringCounts.includes(StringCount.Twelve);

  const isAcousticDisabled = isFourStringsCheck && !isSixStringsCheck && !isSevenStringsCheck && !isTwelveStringsCheck;
  const isElectricDisabled = isTwelveStringsCheck && !isFourStringsCheck && !isSixStringsCheck && !isSevenStringsCheck;
  const isUkuleleDisabled = (isSixStringsCheck || isSevenStringsCheck || isTwelveStringsCheck) && !isFourStringsCheck;

  const [isAcousticCheck, setIsAcousticCheck] = useState(
    queryTypes.includes(GuitarType.Acoustic) && !isAcousticDisabled,
  );
  const [isElectricCheck, setIsElectricCheck] = useState(
    queryTypes.includes(GuitarType.Electric) && !isElectricDisabled,
  );
  const [isUkuleleCheck, setIsUkuleleCheck] = useState(
    queryTypes.includes(GuitarType.Ukulele) && !isUkuleleDisabled,
  );

  useEffect(() => {
    const newQueryTypes = [
      `${isAcousticCheck && !isAcousticDisabled ? GuitarType.Acoustic : ''}`,
      `${isElectricCheck && !isElectricDisabled ? GuitarType.Electric : ''}`,
      `${isUkuleleCheck && !isUkuleleDisabled ? GuitarType.Ukulele : ''}`,
    ].filter((item) => item !== '');

    setQueryTypes(newQueryTypes);
  },
  [
    isAcousticCheck,
    isAcousticDisabled,
    isElectricCheck,
    isElectricDisabled,
    isUkuleleCheck,
    isUkuleleDisabled,
    setQueryTypes,
  ]);

  const onCheckboxChange = (evt: ChangeEvent) => {
    switch (evt.target.id) {
      case CheckBoxName.Acoustic:
        setIsAcousticCheck((prev) => !prev);
        break;
      case CheckBoxName.Electric:
        setIsElectricCheck((prev) => !prev);
        break;
      case CheckBoxName.Ukulele:
        setIsUkuleleCheck((prev) => !prev);
    }
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Тип гитар</legend>
      <div className="form-checkbox catalog-filter__block-item">
        <input
          className="visually-hidden"
          type="checkbox"
          id={CheckBoxName.Acoustic}
          name={CheckBoxName.Acoustic}
          checked={isAcousticCheck}
          disabled={isAcousticDisabled}
          onChange={onCheckboxChange}
        />
        <label htmlFor={CheckBoxName.Acoustic}>Акустические гитары</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input
          className="visually-hidden"
          type="checkbox"
          id={CheckBoxName.Electric}
          name={CheckBoxName.Electric}
          checked={isElectricCheck}
          disabled={isElectricDisabled}
          onChange={onCheckboxChange}
        />
        <label htmlFor={CheckBoxName.Electric}>Электрогитары</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input
          className="visually-hidden"
          type="checkbox"
          id={CheckBoxName.Ukulele}
          name={CheckBoxName.Ukulele}
          checked={isUkuleleCheck}
          disabled={isUkuleleDisabled}
          onChange={onCheckboxChange}
        />
        <label htmlFor={CheckBoxName.Ukulele}>Укулеле</label>
      </div>
    </fieldset>
  );
}

export default FilterByType;
