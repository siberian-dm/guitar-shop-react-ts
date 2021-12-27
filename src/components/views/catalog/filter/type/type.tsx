import useQuery from '../../../../../hooks/use-query';
import { AppRoute, GuitarType, QueryField } from '../../../../../const';
import { parse, stringify } from 'query-string';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

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

  const onAcousticCheckboxChange = () => {
    setIsAcousticCheck((prev) => !prev);
  };

  const onElectricCheckboxChange = () => {
    setIsElectricCheck((prev) => !prev);
  };

  const onUkuleleCheckboxChange = () => {
    setIsUkuleleCheck((prev) => !prev);
  };

  useEffect(() => {
    const newQueryString = stringify(
      {
        ...parse(queryString),
        type: [
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

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Тип гитар</legend>
      <div className="form-checkbox catalog-filter__block-item">
        <input
          className="visually-hidden"
          type="checkbox"
          id="acoustic"
          name="acoustic"
          checked={isAcousticCheck}
          onChange={onAcousticCheckboxChange}
        />
        <label htmlFor="acoustic">Акустические гитары</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input
          className="visually-hidden"
          type="checkbox"
          id="electric"
          name="electric"
          checked={isElectricCheck}
          onChange={onElectricCheckboxChange}
        />
        <label htmlFor="electric">Электрогитары</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input
          className="visually-hidden"
          type="checkbox"
          id="ukulele"
          name="ukulele"
          checked={isUkuleleCheck}
          onChange={onUkuleleCheckboxChange}
        />
        <label htmlFor="ukulele">Укулеле</label>
      </div>
    </fieldset>
  );
}

export default Type;
