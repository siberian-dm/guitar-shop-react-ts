import useQuery from '../../../../../hooks/use-query';
import { AppRoute, QueryField } from '../../../../../const';
import { ChangeEvent, useState } from 'react';
import { getPriceMaxLimit, getPriceMinLimit } from '../../../../../store/reducers/catalog-slice/selectors';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { validatePriceMax, validatePriceMin } from '../../../../../utils/validate-price';

function FilterByPrice(): JSX.Element {
  const query = useQuery();
  const history = useHistory();
  const queryPriceMin = query.get(QueryField.PriceMin) ?? '';
  const queryPriceMax = query.get(QueryField.PriceMax) ?? '';

  const priceMinLimit = useSelector(getPriceMinLimit);
  const priceMaxLimit = useSelector(getPriceMaxLimit);

  const [priceMin, setPriceMin] = useState(queryPriceMin);
  const [priceMax, setPriceMax] = useState(queryPriceMax);

  const applyQueryParams = () => {
    history.push(`${AppRoute.Catalog}?${query}`);
  };

  const onPriceMinInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPriceMin(evt.target.value);
  };

  const onPriceMaxInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPriceMax(evt.target.value);
  };

  const onPriceMinInputBlur = () => {
    const validatedPriceMin = validatePriceMin({
      currentMin: priceMin,
      currentMax: priceMax,
      limitMin: priceMinLimit,
      limitMax: priceMaxLimit,
    });

    setPriceMin(validatedPriceMin);

    if (validatedPriceMin !== queryPriceMin) {
      query.set(QueryField.PriceMin, validatedPriceMin);
      applyQueryParams();
    }
  };

  const onPriceMaxInputBlur = () => {
    const validatedPriceMax = validatePriceMax({
      currentMin: priceMin,
      currentMax: priceMax,
      limitMin: priceMinLimit,
      limitMax: priceMaxLimit,
    });

    setPriceMax(validatedPriceMax);

    if (validatedPriceMax !== queryPriceMax) {
      query.set(QueryField.PriceMax, validatedPriceMax);
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
            placeholder={String(priceMinLimit)}
            id="priceMin"
            name="от"
            onChange={onPriceMinInputChange}
            onBlur={onPriceMinInputBlur}
            value={priceMin}
          />
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input
            type="number"
            placeholder={String(priceMaxLimit)}
            id="priceMax"
            name="до"
            onChange={onPriceMaxInputChange}
            onBlur={onPriceMaxInputBlur}
            value={priceMax}
          />
        </div>
      </div>
    </fieldset>
  );
}

export default FilterByPrice;
