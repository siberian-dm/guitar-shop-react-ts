import useQuery from '../../../../../hooks/use-query';
import { ChangeEvent, useEffect, useState } from 'react';
import { getCatalogRouteWithCurrentPage } from '../../../../../store/reducers/catalog-slice/selectors';
import { GuitarType, QueryField, StringCount } from '../../../../../const';
import { parse, stringify } from 'query-string';
import { parseArrayFromQueryByField } from '../../../../../utils/common';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const enum CheckBoxName {
  Acoustic = 'acoustic',
  Electric = 'electric',
  Ukulele = 'ukulele',
}

function FilterByType(): JSX.Element {
  const query = useQuery();
  const history = useHistory();
  const catalogRouteWithCurrentPage = useSelector(getCatalogRouteWithCurrentPage);

  const queryStringCounts = parseArrayFromQueryByField(query, QueryField.StringCount);
  const queryTypes = parseArrayFromQueryByField(query, QueryField.Type);

  const isFourStringsCheck = queryStringCounts.includes(StringCount.Four);
  const isSixStringsCheck = queryStringCounts.includes(StringCount.Six);
  const isSevenStringsCheck = queryStringCounts.includes(StringCount.Seven);
  const isTwelveStringsCheck = queryStringCounts.includes(StringCount.Twelve);

  const isAcousticDisabled = isFourStringsCheck;
  const isElectricDisabled = isTwelveStringsCheck;
  const isUkuleleDisabled = isSixStringsCheck || isSevenStringsCheck || isTwelveStringsCheck;

  const [isAcousticCheck, setIsAcousticCheck] = useState(false);
  const [isElectricCheck, setIsElectricCheck] = useState(false);
  const [isUkuleleCheck, setIsUkuleleCheck] = useState(false);

  useEffect(() => {
    setIsAcousticCheck(
      queryTypes.includes(GuitarType.Acoustic) && !isAcousticDisabled,
    );
    setIsElectricCheck(
      queryTypes.includes(GuitarType.Electric) && !isElectricDisabled,
    );
    setIsUkuleleCheck(
      queryTypes.includes(GuitarType.Ukulele) && !isUkuleleDisabled,
    );
  },
  [
    isAcousticDisabled,
    isElectricDisabled,
    isUkuleleDisabled,
    queryTypes,
  ]);

  useEffect(() => {
    const queryString = query.toString();
    const newQueryString = stringify(
      {
        ...parse(queryString),
        [QueryField.Type]: [
          `${isAcousticCheck ? GuitarType.Acoustic : ''}`,
          `${isElectricCheck ? GuitarType.Electric : ''}`,
          `${isUkuleleCheck ? GuitarType.Ukulele : ''}`,
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
    isAcousticCheck,
    isElectricCheck,
    isUkuleleCheck,
    query,
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
