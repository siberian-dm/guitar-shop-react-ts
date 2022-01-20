import { BtnKey, QueryField } from '../../../../../const';
import {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  useEffect,
  useState
} from 'react';
import { getPriceMaxLimit, getPriceMinLimit } from '../../../../../store/reducers/catalog-slice/selectors';
import { NumberParam, useQueryParam } from 'use-query-params';
import { useSelector } from 'react-redux';
import { validatePriceMax, validatePriceMin } from '../../../../../utils/validate-price';

enum InputId {
  PriceMin = 'priceMin',
  PriceMax = 'priceMax',
}

function FilterByPrice(): JSX.Element {
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  const [queryPriceMin, setQueryPriceMin] = useQueryParam(QueryField.PriceMin, NumberParam);
  const [queryPriceMax, setQueryPriceMax] = useQueryParam(QueryField.PriceMax, NumberParam);

  const priceMinLimit = useSelector(getPriceMinLimit);
  const priceMaxLimit = useSelector(getPriceMaxLimit);

  useEffect(() => {
    const initialMin = queryPriceMin ? String(queryPriceMin) : '';
    const initialMax = queryPriceMax ? String(queryPriceMax) : '';

    setPriceMin(initialMin);
    setPriceMax(initialMax);
  },
  [queryPriceMax, queryPriceMin]);

  const handleValidatePriceMin = () => {
    const validatedPriceMin = validatePriceMin({
      currentMin: priceMin,
      currentMax: priceMax,
      limitMin: priceMinLimit,
      limitMax: priceMaxLimit,
    });

    const newQueryPriceMin = validatedPriceMin !== ''
      ? Number(validatedPriceMin)
      : undefined;

    if (validatedPriceMin !== priceMin) {
      setPriceMin(validatedPriceMin);
    }

    if (newQueryPriceMin !== queryPriceMin) {
      setQueryPriceMin(newQueryPriceMin);
    }
  };

  const handleValidatePriceMax = () => {
    const validatedPriceMax = validatePriceMax({
      currentMin: priceMin,
      currentMax: priceMax,
      limitMin: priceMinLimit,
      limitMax: priceMaxLimit,
    });

    const newQueryPriceMax = validatedPriceMax !== ''
      ? Number(validatedPriceMax)
      : undefined;

    if (validatedPriceMax !== priceMax) {
      setPriceMax(validatedPriceMax);
    }

    if (newQueryPriceMax !== queryPriceMax) {
      setQueryPriceMax(newQueryPriceMax);
    }
  };

  const onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    switch (evt.target.id) {
      case InputId.PriceMin:
        setPriceMin(evt.target.value);
        break;
      case InputId.PriceMax:
        setPriceMax(evt.target.value);
    }
  };

  const onInputKeyDown = (id: string) =>
    (evt: KeyboardEvent) => {
      if (evt.key === BtnKey.Enter) {
        evt.preventDefault();

        switch (id) {
          case InputId.PriceMin:
            handleValidatePriceMin();
            break;
          case InputId.PriceMax:
            handleValidatePriceMax();
        }
      }
    };

  const onInputBlur = (evt: FocusEvent) => {
    switch (evt.target.id) {
      case InputId.PriceMin:
        handleValidatePriceMin();
        break;
      case InputId.PriceMax:
        handleValidatePriceMax();
    }
  };

  return (
    <fieldset
      data-testid="filter-by-price"
      className="catalog-filter__block"
    >
      <legend className="catalog-filter__block-title">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="form-input">
          <label className="visually-hidden">Минимальная цена</label>
          <input
            type="number"
            placeholder={String(priceMinLimit)}
            id={InputId.PriceMin}
            name="от"
            onChange={onInputChange}
            onBlur={onInputBlur}
            onKeyDown={onInputKeyDown(InputId.PriceMin)}
            value={priceMin}
          />
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input
            type="number"
            placeholder={String(priceMaxLimit)}
            id={InputId.PriceMax}
            name="до"
            onChange={onInputChange}
            onBlur={onInputBlur}
            onKeyDown={onInputKeyDown(InputId.PriceMax)}
            value={priceMax}
          />
        </div>
      </div>
    </fieldset>
  );
}

export default FilterByPrice;
