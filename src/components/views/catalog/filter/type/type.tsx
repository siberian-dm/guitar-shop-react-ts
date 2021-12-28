import useQuery from '../../../../../hooks/use-query';
import { AppRoute, GuitarType, QueryField } from '../../../../../const';
import { ChangeEvent, useEffect, useState } from 'react';
import { parse, stringify } from 'query-string';
import { useHistory } from 'react-router-dom';

const enum CheckBoxName {
  Acoustic = 'acoustic',
  Electric = 'electric',
  Ukulele = 'ukulele',
}

function Type(): JSX.Element {
  const query = useQuery();
  const history = useHistory();

  const queryString = query.toString();
  const parsedQueryTypes = parse(queryString)[QueryField.Type];

  const queryTypes = parsedQueryTypes && typeof parsedQueryTypes !== 'string'
    ? parsedQueryTypes
    : [parsedQueryTypes];

  const [isAcousticCheck, setIsAcousticCheck] = useState(queryTypes.includes(GuitarType.Acoustic));
  const [isElectricCheck, setIsElectricCheck] = useState(queryTypes.includes(GuitarType.Electric));
  const [isUkuleleCheck, setIsUkuleleCheck] = useState(queryTypes.includes(GuitarType.Ukulele));

  useEffect(() => {
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
      history.push(`${AppRoute.Catalog}?${newQueryString}`);
    }
  }, [history, isAcousticCheck, isElectricCheck, isUkuleleCheck, queryString]);

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
          onChange={onCheckboxChange}
        />
        <label htmlFor={CheckBoxName.Ukulele}>Укулеле</label>
      </div>
    </fieldset>
  );
}

export default Type;
