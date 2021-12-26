import useQuery from '../../../../../hooks/use-query';
import { AppRoute, QueryField } from '../../../../../const';
import { ChangeEvent, useState } from 'react';
import { getPriceRange } from '../../../../../store/reducers/app-data-reducer/selectors';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { validatePriceMax, validatePriceMin } from '../../../../../utils/validate-price';

function Price(): JSX.Element {
  const query = useQuery();
  const history = useHistory();
  const queryPriceMin = query.get(QueryField.PriceMin) ?? '';
  const queryPriceMax = query.get(QueryField.PriceMax) ?? '';

  const validPriceRange = useSelector(getPriceRange);

  const [priceRange, setPriceRange] = useState({
    min: queryPriceMin,
    max: queryPriceMax,
  });

  const applyQueryParams = () => {
    history.push(`${AppRoute.Catalog}?${query}`);
  };

  const onPriceMinInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPriceRange((prev) => ({...prev, min: evt.target.value}));
  };

  const onPriceMaxInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPriceRange((prev) => ({...prev, max: evt.target.value}));
  };

  const onPriceMinInputBlur = () => {
    const validPriceMin = validatePriceMin(priceRange.min, priceRange.max, validPriceRange);
    setPriceRange((prev) => ({...prev, min: validPriceMin}));
    if (validPriceMin !== queryPriceMin) {
      query.set(QueryField.PriceMin, validPriceMin);
      applyQueryParams();
    }
  };

  const onPriceMaxInputBlur = () => {
    const validPriceMax = validatePriceMax(priceRange.min, priceRange.max, validPriceRange);
    setPriceRange((prev) => ({...prev, max: validPriceMax}));

    if (validPriceMax !== queryPriceMax) {
      query.set(QueryField.PriceMax, validPriceMax);
      applyQueryParams();
    }
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="form-input">
          <label className="visually-hidden">Минимальная цена</label>
          <input
            type="number"
            placeholder={String(validPriceRange.min)}
            id="priceMin"
            name="от"
            onChange={onPriceMinInputChange}
            onBlur={onPriceMinInputBlur}
            value={priceRange.min}
          />
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input
            type="number"
            placeholder={String(validPriceRange.max)}
            id="priceMax"
            name="до"
            onChange={onPriceMaxInputChange}
            onBlur={onPriceMaxInputBlur}
            value={priceRange.max}
          />
        </div>
      </div>
    </fieldset>
  );
}

export default Price;
